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

import { DELETE_CATEGORY_MUTATION } from "@/apollo/mutations";
import { GET_CATEGORY_QUERY } from "@/apollo/queries";

export default function DeleteCategoryModal({ name, _id, children }) {
  const [isOpen, setIsOpen] = React.useState();
  const cancelRef = React.useRef();
  const onClose = () => setIsOpen(false);

  const [deleteCagetory] = useMutation(DELETE_CATEGORY_MUTATION, {
    variables: { _id },
    refetchQueries: [{ query: GET_CATEGORY_QUERY }],
  });

  const onDelete = () => {
    deleteCagetory();

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
