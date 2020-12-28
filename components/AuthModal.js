import React from "react";
import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

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

const AuthModal = ({ children }) => {
  const [isSignInForm, setSignInForm] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            key={isSignInForm}
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
                  className={isSignInForm ? "signIn" : "register"}>
                  <Box
                    onClick={() => setSignInForm(true)}
                    px={6}
                    py={4}
                    borderBottomLeftRadius={6}
                    borderBottomRightRadius={6}
                    cursor='pointer'>
                    Sign In
                  </Box>
                  <Box
                    onClick={() => setSignInForm(false)}
                    px={6}
                    py={4}
                    borderBottomLeftRadius={6}
                    borderBottomRightRadius={6}
                    cursor='pointer'>
                    Register
                  </Box>
                </PseudoBox>
                <ModalCloseButton />
                <ModalBody height={{ sm: "530px", md: "540px" }}>
                  {isSignInForm ? (
                    <LoginForm onClose={onClose}>
                      <Button
                        type='submit'
                        mt={8}
                        mb={6}
                        variantColor='teal'
                        w='full'>
                        Sign In
                      </Button>
                    </LoginForm>
                  ) : (
                    <RegisterForm onClose={onClose}>
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
