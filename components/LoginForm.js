import { useRouter } from "next/router";
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
  Icon,
  useToast,
} from "@chakra-ui/core";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
    }
  }
`;

const toastModal = (toast, status, data) => {
  let title, description;
  if (status === "success") {
    title = `Welcome back, ${data.login.username}`;
    description = `Enjoy our site!`;
  } else {
    title = `Authentication failed.`;
    description = `${data.username} \n ${data.password}`;
  }

  return toast({
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
  });
};

export const LoginForm = ({ onClose, children }) => {
  const { signinWithCustom } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const { register, handleSubmit, errors } = useForm();
  const [loginVariables, setLoginVariables] = useState({});
  const [validateError, setValidateError] = useState({});

  const [loginUser] = useMutation(LOGIN, {
    update(cache, { data }) {
      signinWithCustom(data.login);

      toastModal(toast, "success", data);
      onClose();
      const currentPath = router.pathname;
      if (currentPath === "/") router.push("categories");
      else router.push(currentPath);
    },
    onError({ networkError, graphQLErrors }) {
      const { username, password } = graphQLErrors[0].extensions.errors;
      toastModal(toast, "error", { username, password });
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
        <Box d='flex' justifyContent='center' alignItems='center'>
          <Text as='h1' textAlign='center' mb='auto'>
            DAYFRUIT
          </Text>
          <Icon name='logo' size='38px' ml={2} />
        </Box>
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
          color='black'
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
          color='black'
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
        // onClick={(e) => auth.signinWithFacebook()}
        mb={4}
        leftIcon='facebook'
        backgroundColor='blue.800'
        color='white'
        fontWeigh='medium'
        _hover={{ bg: "blue.700" }}
        _active={{ bg: "blue.800", transform: "scale(0.95" }}>
        Sign in with Facebook
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
