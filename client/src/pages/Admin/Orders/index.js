import React from "react";
import { useQuery } from "react-query";
import { fetchOrder } from "../../../api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableCaption,
  Text,
} from "@chakra-ui/react";
function AdminOrder() {
  const { isLoading, isError, data, error } = useQuery("admin:orders", 
		fetchOrder
	);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }
  return <div>
    
    <Text fontSize="2xl" p="5">Orders</Text>

    <Table variant="simple">
      <TableCaption>
        Imperal to metric conversion factors
      </TableCaption>
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Address</Th>
          <Th isNumeric>Items</Th>
        </Tr>
      </Thead>
      <Tbody>
      {data.map((item) => (
						<Tr key={item._id}>
							<Td>{item.user?.email}</Td>
							<Td>{item.adress}</Td>
							<Td isNumeric>{item.items.length}</Td>
						</Tr>
					))}
      </Tbody>
    </Table>
  </div>;
}

export default AdminOrder;
