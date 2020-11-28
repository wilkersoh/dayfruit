import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/utils/auth";
import { gql, useMutation } from "@apollo/client";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "@emotion/styled";

const Test = styled.div`
  border: 4px solid red;
  @media (max-width: 768px) {
    border: 4px solid blue;
  }
`;

import { SignInForm, RegisterForm } from "@/components/AuthForm";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  PseudoBox,
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
  const [newUser, setNewUser] = useState({});
  const [isSignIn, setIsSignIn] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = useAuth();
  const { register, handleSubmit, watch, errors } = useForm();

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

  const onSignInSubmit = (data) => {
    // setNewUser(data);
    // addUser();
  };

  const onRegisterSubmit = (data) => {
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
        <SwitchTransition>
          <CSSTransition
            key={isSignIn}
            timeout={{ exit: 450, enter: 350 }}
            classNames={"auth-switch"}>
            <ModalContent
              bg='rgb(45, 55, 72)'
              top='50%'
              transform='translateY(-50%)'
              borderRadius={6}
              overflow='hidden'
              w={{ sm: "90%", lg: "100%" }}
              my={0}>
              <Box>
                <PseudoBox
                  d='flex'
                  justifyContent='center'
                  className={isSignIn ? "signIn" : "register"}>
                  <Box
                    onClick={() => setIsSignIn(true)}
                    px={6}
                    py={4}
                    borderBottomLeftRadius={6}
                    borderBottomRightRadius={6}
                    cursor='pointer'>
                    Sign In
                  </Box>
                  <Box
                    onClick={() => setIsSignIn(false)}
                    px={6}
                    py={4}
                    borderBottomLeftRadius={6}
                    borderBottomRightRadius={6}
                    cursor='pointer'>
                    Register
                  </Box>
                </PseudoBox>
                <ModalCloseButton />
                <ModalBody height='540px'>
                  {isSignIn ? (
                    <SignInForm
                      handleSubmit={handleSubmit}
                      register={register}
                      onSubmit={onSignInSubmit}
                      errors={errors}>
                      <Button
                        type='submit'
                        mt={8}
                        mb={6}
                        variantColor='teal'
                        w='full'>
                        Sign In
                      </Button>
                    </SignInForm>
                  ) : (
                    <RegisterForm
                      handleSubmit={handleSubmit}
                      register={register}
                      watch={watch}
                      onSubmit={onRegisterSubmit}
                      errors={errors}>
                      <Button
                        type='submit'
                        mt={8}
                        mb={6}
                        variantColor='teal'
                        w='full'>
                        Register Account
                      </Button>
                    </RegisterForm>
                  )}
                </ModalBody>
              </Box>
            </ModalContent>
          </CSSTransition>
        </SwitchTransition>
      </Modal>
    </>
  );
};

export default AuthModal;
