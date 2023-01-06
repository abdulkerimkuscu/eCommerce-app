import {
  Alert,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Tfoot,
  Grid
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";
import { useBasket } from "../../context/BasketContex";


function Basket() {
  const [address, setAddress] = useState();
  const { items, removeFromBasket, emptyBasket } = useBasket();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };
    await postOrder(input);
    emptyBasket();
    onClose();
  };
  return (
    <Box p={5}>
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket.</Alert>
      )}

      {items.length > 0 && (
        <>
          
          <Grid templateColumns="repeat(3, 1fr)" gap={4} borderBottom ="1px solid gray">
      
            {items.map((item) => (
              <ul >
              <li key={item._id} style={{ marginBottom: 15 }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize={20}>
                    {item.title} -- {item.price} TL
                  </Text>
                  <Image
                    htmlWidth="75%"
                    src={item.photos[0]}
                    alt="basket item"
                  />
                </Link>
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove From Basket
                </Button>
              </li>
              </ul>
            ))}
            </Grid>
          <Box display="flex" justifyContent="center">
          <Box mt={10} textAlign="center">
            <TableContainer borderBottom="1px solid gray" >
              <Table size="md" >
                <Thead   >
                  <Tr >
                    <Th>Product Name</Th>
                    <Th isNumeric>Price</Th>
                    
                  </Tr>
                </Thead>
                <Tbody>
                  {items.map((item) => (
                    <Tr key={item._id}>
                      <Td>{item.title}</Td>
                      <Td isNumeric>{item.price} TL</Td>
                    </Tr>
                  ))}
                 
                </Tbody>
                <Tfoot mt={10}>
                  <Tr>
                    <Th>Total Price:</Th>
                    <Th>
                      <Text fontSize="15px"> {total} TL</Text>
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            <Button mt={2} size="sm" colorScheme="green" onClick={onOpen} >
            Order
          </Button>
          </Box>
          </Box>

          
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;



      