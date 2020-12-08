import React from "react";
import { useMutation } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
} from "@chakra-ui/core";

import { DELETE_FRUIT_MUTATION } from "@/apollo/mutations";
import { GET_FRUTIS_QUERY } from "@/apollo/queries";

export default function DeleteFruitModal({ name, _id, children }) {
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [deleteFruit] = useMutation(DELETE_FRUIT_MUTATION, {
    variables: { _id },
    refetchQueries: [{ query: GET_FRUTIS_QUERY }],
    // update(cached, result) {
    //   const data = cached.readQuery({ query: GET_FRUTIS_QUERY });
    //   data.getFruits = data.getFruits.filter((fruit) => fruit._id !== _id);
    //   cached.writeQuery({ query: GET_FRUTIS_QUERY, data });
    // },
  });

  const onDelete = () => {
    deleteFruit();

    onClose();
  };

  return (
    <>
      <Box onClick={() => setIsOpen(true)}>{children}</Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent color='black'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete {name}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor='red' onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
