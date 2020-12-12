import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/core";
import App from "@/components/cms/App";
import { useState } from "react";
import { gql, useMutation } from "@apollo/react-hooks";

const CMSLOGIN_MUTATION = gql`
  mutation cmsLogin($email: String!, $password: String!) {
    cmsLogin(email: $email, password: $password) {
      username
    }
  }
`;

export default function login() {
  const router = useRouter();
  const [values, setValues] = useState({});

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginCms] = useMutation(CMSLOGIN_MUTATION, {
    variables: values,
    onError(errors) {
      console.log(errors);
    },
    update() {
      router.push("/cms");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginCms();
  };

  return (
    <App d='flex' pt={10}>
      <Box m='auto'>
        <FormControl as='form' onSubmit={onSubmit}>
          <FormControl as='fieldset'>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input
              type='email'
              id='email'
              name='email'
              color='black'
              onChange={onChange}
              aria-describedby='email-helper-text'
            />
          </FormControl>
          <FormControl as='fieldset'>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              type='password'
              id='password'
              name='password'
              color='black'
              onChange={onChange}
              aria-describedby='password'
            />
          </FormControl>
          <Button type='submit' mt={4} variantColor='teal' w='full'>
            Sign In
          </Button>
        </FormControl>
      </Box>
    </App>
  );
}
