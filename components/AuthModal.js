import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/utils/auth";
import { gql, useMutation } from "@apollo/client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";

const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $mobile: String
    $address: String
    $email: String
  ) {
    registerUser(
      registerInput: {
        username: $username
        password: $password
        mobile: $mobile
        address: $address
        email: $email
      }
    ) {
      id
      username
      mobile
      address
      email
    }
  }
`;

const AuthModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUser, setNewUser] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();
  const auth = useAuth();

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(cache, { data }) {
      auth.signinWithCustom(data);
      Router.push("/product");
    },
    onError({ networkError, graphQLErrors }) {
      console.log(graphQLErrors[0].extensions);
      const { username } = graphQLErrors[0].extensions;
      // setErrors({ username });
    },
    variables: newUser,
  });

  const onSubmit = (data) => {
    setNewUser(data);
    addUser();
  };
  return (
    <>
      <Button
        bg='transparent'
        border='1px solid transparent'
        _hover={{ bg: "transparent", border: "1px solid #ffffff29" }}
        _active={{ bg: "teal" }}
        onClick={onOpen}>
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as='form' onSubmit={handleSubmit(onSubmit)}>
              <FormLabel htmlFor='username'>Username</FormLabel>
              <Input
                ref={register({
                  required: "Please tell us your name",
                })}
                id='username'
                type='type'
                name='username'
                // focusBorderColor='pink.400'
                isInvalid={errors.username && true}
                errorBorderColor='red.300'
                placeholder={
                  errors.username
                    ? "username is required"
                    : "Please Fill in username"
                }
              />
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                ref={register({
                  required: "Please fill your password",
                })}
                id='password'
                type='password'
                name='password'
              />
              <FormLabel htmlFor='confirmPassword'>Password Confirm</FormLabel>
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
                    : "Please fill in password"
                }
              />
              <FormLabel htmlFor='mobile'>Mobile</FormLabel>
              <Input ref={register} type='text' id='mobile' name='mobile' />
              <FormLabel htmlFor='address'>Address</FormLabel>
              <Input ref={register} type='text' id='address' name='address' />
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                ref={register({
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
                isInvalid={errors.email && true}
                errorBorderColor='red.300'
                type='email'
                id='email'
                name='email'
                placeholder={errors.email ? "Invalid email address" : "Emails"}
              />
              <Button type='submit'>Create</Button>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
