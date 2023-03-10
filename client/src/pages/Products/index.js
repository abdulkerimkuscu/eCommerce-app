import { Box, Flex, Grid, Button } from "@chakra-ui/react";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api";
import Card from "../../components/Card";

function Products() {
  const { data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status, } = useInfiniteQuery("products", fetchProductList,{
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    }
  })

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;
 
  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {/* {data.map((item, key) => (
          <Card key={key} item={item} />
        ))} */}
        {
          data.pages.map((group,key) => (
            <React.Fragment key={key}>
             { group.map((item) => (
              <Box w="100%" key={item._id}>
                <Card item={item}/>
              </Box>
             ))}
            </React.Fragment>
          ))
        }
      </Grid>
      <Flex mt="10" justifyContent="center">
         <Button isLoading={isFetchingNextPage}
           onClick={() => fetchNextPage()}
           disabled={!hasNextPage || isFetchingNextPage}
         >
           {isFetchingNextPage
             ? 'Loading more...'
             : hasNextPage
             ? 'Load More'
             : 'Nothing more to load'}
         </Button>
       
      
       </Flex>
    </div>
  );
}

export default Products;
