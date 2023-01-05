import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import validationSchema from "./validations";
import { message } from "antd";
function AdminProductDetail() {
  const { product_id } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product_update" });

    try {
      await updateProduct(values, product_id);

      message.success({
        content: "The product succesfully updated",
        key: "product_update",
        duration: 2,
      });
    } catch (e) {
        message.error(`The Product does not updated \n Because ${e.message}`);
    }
  };

  return (
    <div>
      <Text fontSize="2xl">Edit</Text>

      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box my={5} textAlign="left">
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                    />
                    {touched.title && errors.title && (
                      <Text color={"red"}>{errors.title}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={touched.description && errors.description}
                    />
                    {touched.description && errors.description && (
                      <Text color={"red"}>{errors.description}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={touched.price && errors.price}
                    />
                    {touched.price && errors.price && (
                      <Text color={"red"}>{errors.price}</Text>
                    )}
                  </FormControl>
                  <FormControl mt={5}>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <>
                          <div>
                            {values.photos &&
                              values.photos.map((photo, index) => (
                                <div key={index}>
                                  <Input
                                    name={`photos.${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                    width={"3xl"}
                                  />
                                  <Button
                                    ml={4}
                                    type={"button"}
                                    colorScheme={"red"}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                          </div>

                          <Button mt={5} onClick={() => arrayHelpers.push("")}>
                            Add a Photo
                          </Button>
                        </>
                      )}
                    />
                  </FormControl>
                  <Button
                    mt={5}
                    type="submit"
                    width="full"
                    isLoading={isSubmitting}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  );
}

export default AdminProductDetail;
