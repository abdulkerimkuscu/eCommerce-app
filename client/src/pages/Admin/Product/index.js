import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Popconfirm, Table } from "antd";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AdminProduct() {
  const { isLoading, isError, data, error } = useQuery(
    "admin:product",
    fetchProductList
  );
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:product"),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "created Ad",
      },
      {
        title: "Action",
        key: "action",
        render: (record, text) => (
          <>
            <Link to={`${record._id}`}>Edit</Link>
            <Popconfirm
              title="Are You Sure?"
              onConfirm={() => {
                deleteMutation.mutate(record._id, {
                  onSuccess: () => {},
                });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <a href="/#" style={{ marginLeft: 10 }}>
                Delete
              </a>
            </Popconfirm>
          </>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" p={5}>
          Products
        </Text>
        
        <Link to="/admin/products/new"><Button>New</Button></Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id"></Table>
    </div>
  );
}

export default AdminProduct;
