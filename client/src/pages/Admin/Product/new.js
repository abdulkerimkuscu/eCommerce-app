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
  import {  useMutation, useQueryClient } from "react-query";
 
  import { postProduct } from "../../../api";
  import validationSchema from "./validations";
  import { message } from "antd";
  function NewProduct() {
    const queryClient = useQueryClient();
    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:product"),})
    
        const handleSubmit = async (values, bag) => {
           
    
            const newValues = { ...values, photos: JSON.stringify(values.photos) };
    
            message.loading({ content: "Loading...", key: "post_product" });
            newProductMutation.mutate(newValues, {
                onSuccess: () => {
                    
                    message.success({
                        content: "The product succesfully updated",
                        key: "product_update",
                        duration: 2,
                    });
                },
            });
        };
  
    return (
      <div>
        <Text fontSize="2xl">New Product</Text>
  
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
            photos: []
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
                      Save
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
  
  export default NewProduct;
  