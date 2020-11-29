import Router from "next/router";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/core";
import { useAuth } from "@/utils/auth";

const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String! # $mobile: String # $address: String # $email: String
    $email: String!
    $mobile: String
    $address: String
  ) {
    registerUser(
      registerInput: {
        username: $username
        password: $password
        email: $email
        mobile: $mobile
        address: $address
      }
    ) {
      id
      username
      email
    }
  }
`;

export const RegisterForm = ({ onClose, children }) => {
  const { signinWithCustom } = useAuth();
  const [newUser, setNewUser] = useState({});
  const [validateError, setValidateError] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();

  const [addUser] = useMutation(REGISTER_USER, {
    update(cache, { data }) {
      signinWithCustom(data);
      onClose();
      Router.push("/home");
    },
    onError({ networkError, graphQLErrors }) {
      const { username, email } = graphQLErrors[0].extensions.errors;
      setValidateError({ username, email });
    },
    variables: newUser,
  });

  const onSubmit = (data) => {
    console.log(data);
    setNewUser(data);
    addUser();
  };

  return (
    <FormControl as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormLabel mt={1} htmlFor='username'>
        Username
        <Box as='span' color='red.500' ml={1}>
          *
        </Box>
      </FormLabel>
      <Input
        ref={register({
          required: "Please tell use your name",
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
          (errors.username && "username is required") || validateError.username
            ? validateError.username
            : "Username"
        }
      />
      <FormLabel mt={1} htmlFor='email'>
        Email
        <Box as='span' color='red.500' ml={1}>
          *
        </Box>
      </FormLabel>
      <Input
        ref={register({
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          },
          required: "Please fill in your email",
        })}
        isInvalid={(errors.email && true) || (validateError.email && true)}
        errorBorderColor='red.300'
        type='email'
        id='email'
        name='email'
        placeholder={
          (errors.email && "Invalid email address") || validateError.email
            ? validateError.email
            : "Email Address"
        }
      />
      <FormLabel mt={1} htmlFor='password'>
        Password
        <Box as='span' color='red.500' ml={1}>
          *
        </Box>
      </FormLabel>
      <Input
        ref={register({
          required: "Please fill your password",
        })}
        id='password'
        type='password'
        name='password'
        placeholder={`Password`}
      />
      <FormLabel mt={1} htmlFor='confirmPassword'>
        Password Confirm
        <Box as='span' color='red.500' ml={1}>
          *
        </Box>
      </FormLabel>
      <Input
        ref={register({
          validate: (value) =>
            value === watch("password") || "Passwords don't match.",
        })}
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        isInvalid={errors.confirmPassword && true}
        errorBorderColor='red.300'
        placeholder={
          errors.confirmPassword
            ? "Passwords don't match."
            : "Password Confirmation"
        }
      />
      <FormLabel mt={1} htmlFor='mobile'>
        Mobile
      </FormLabel>
      <Input
        ref={register}
        type='text'
        id='mobile'
        name='mobile'
        placeholder={`Malaysia Mobile Number`}
      />
      <FormLabel mt={1} htmlFor='address'>
        Address
      </FormLabel>
      <Input
        ref={register}
        type='text'
        id='address'
        name='address'
        placeholder={`Home Address`}
      />
      {children}
    </FormControl>
  );
};
