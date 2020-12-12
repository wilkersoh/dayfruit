import { useEffect } from "react";
import NextLink from "next/link";
import {
  Box,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";

const Login = () => {
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Lorem count={2} />
          </ModalBody>

          <ModalFooter>
            <Button variantColor='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function Header(props) {
  return (
    <Box as='header' d='flex' justifyContent='space-between' p={4} {...props}>
      <NextLink href='/cms'>
        <Link>CMS DAYFRUIT</Link>
      </NextLink>
      <Box>Login</Box>
    </Box>
  );
}
