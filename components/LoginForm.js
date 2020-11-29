import { Router } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "@/utils/auth";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Button,
} from "@chakra-ui/core";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
    }
  }
`;

export const LoginForm = ({ onClose, children }) => {
  const { signinWithCustom } = useAuth();

  const { register, handleSubmit, errors } = useForm();
  const [loginVariables, setLoginVariables] = useState({});
  const [validateError, setValidateError] = useState({});

  const [loginUser] = useMutation(LOGIN, {
    update(cache, { data }) {
      signinWithCustom(data);
      onClose();
      Router.push("/");
    },
    onError({ networkError, graphQLErrors }) {
      const { username, password } = graphQLErrors[0].extensions.errors;
      setValidateError({ username, password });
    },
    variables: loginVariables,
  });

  const onSubmit = (data) => {
    setLoginVariables(data);
    loginUser();
  };

  return (
    <FormControl
      as='form'
      d='flex'
      flexDir='column'
      height='full'
      onSubmit={handleSubmit(onSubmit)}>
      <Box d='flex' m='auto' flexDir='column' w='full'>
        <Text as='h1' textAlign='center' mb='auto'>
          DAYFRUIT
        </Text>
        <FormLabel mt={2} htmlFor='username'>
          Username
        </FormLabel>
        <Input
          ref={register({
            required: "Please fill in your username",
          })}
          autoFocus
          id='username'
          type='text'
          name='username'
          isInvalid={
            (errors.username && true) || (validateError.username && true)
          }
          errorBorderColor='red.300'
          placeholder={
            (errors.username && errors.username.message) ||
            validateError.username
              ? validateError.username
              : "Username"
          }
        />
        <FormLabel mt={2} htmlFor='password'>
          Password
        </FormLabel>
        <Input
          ref={register({
            required: "Enter your password",
          })}
          id='password'
          type='password'
          name='password'
          isInvalid={
            (errors.password && true) || (validateError.password && true)
          }
          errorBorderColor='red.300'
          placeholder={
            (errors.password && errors.password.message) ||
            validateError.password
              ? validateError.password
              : "Password"
          }
        />
      </Box>
      <Button
        // onClick={(e) => auth.signinWithGithub()}
        mb={4}
        leftIcon='github'
        backgroundColor='gray.900'
        color='white'
        fontWeigh='medium'
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.800", transform: "scale(0.95" }}>
        Sign in with Github
      </Button>
      <Button
        // onClick={(e) => auth.signinWithGoogle()}
        mb={16}
        leftIcon='google'
        backgroundColor='white'
        color='gray.900'
        variant='outline'
        fontWeigh='medium'
        _hover={{ bg: "gray.100" }}
        _active={{ bg: "gray.100", transform: "scale(0.95" }}>
        Sign in with Google
      </Button>
      {children}
    </FormControl>
  );
};
