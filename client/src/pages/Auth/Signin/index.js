import React from "react";
import {
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Signin() {
  const navigate = useNavigate()
  const {login} = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginRes = await fetchLogin({email: values.email, password: values.password});

        login(loginRes)
        navigate("../profile")
      } catch (e) {
        bag.setErrors({general: e.response.data.message})
      }
    },
  });

  return (
    <div>
      <Flex alignItems="center" justifyContent="center" width="full">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box mt={5}>
            {
              formik.errors.general &&(
                <Alert status="error">
                    {formik.errors.general}
                </Alert>
              )
            }
          </Box>
          <Box my={5} textAlign="center">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>
              
              <Button mt={4} width="100%" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
