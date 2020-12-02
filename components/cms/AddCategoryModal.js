import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Box,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/core";

import { CREATE_CATEGORY_MUTATION } from "@/apollo/mutations";
import { categoryValidate } from "@/utils/validator";

const vitamins = {
  Vitamin_A: "Vitamin A",
  Vitamin_B1: "Vitamin B1",
  Vitamin_B6: "Vitamin B6",
  Vitamin_C: "Vitamin C",
  Vitamin_E: "Vitamin E",
  Vitamin_C2: "Vitamin C2",
};

function AddCategoryModal({ children }) {
  const [categoryVariable, setCategoryVariable] = useState({});
  const [categoryErrors, setCategoryErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    update(cache, { data }) {
      toast({
        title: "Category created.",
        description: `${data.createCategory.name} category was created.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError({ networkError, graphQLErrors }) {
      const errors = graphQLErrors[0].extensions.errors;
      toast({
        title: graphQLErrors[0].message,
        description: errors.name,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setCategoryErrors(errors);
    },
    variables: categoryVariable,
  });

  const handleCheckBox = (data) => {
    setCategoryVariable({ ...categoryVariable, ["vitamins"]: data });
  };

  const onChange = (e) => {
    e.preventDefault();
    setCategoryVariable({
      ...categoryVariable,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = categoryValidate(categoryVariable);
    if (!valid) return setCategoryErrors(errors);

    createCategory();
  };

  const onOpenModal = () => {
    setCategoryVariable({});
    setCategoryErrors({});
    onOpen();
  };

  return (
    <>
      <Button onClick={onOpenModal} variantColor='teal'>
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color='black'>
          <ModalHeader>Create Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl as='form' onSubmit={onSubmit}>
              <FormLabel htmlFor='category'>
                Category
                <Box ml={1} as='span' color='red.300'>
                  *
                </Box>
              </FormLabel>
              <Input
                type='text'
                placeholder={
                  categoryErrors.name
                    ? categoryErrors.name
                    : "create new category"
                }
                autoFocus
                id='name'
                name='name'
                isInvalid={categoryErrors.name && true}
                errorBorderColor='red.300'
                onChange={onChange}
              />
              <Box d='flex' maxH='155px'>
                <FormLabel htmlFor='vitamins' mt={1}>
                  Vitamins:
                </FormLabel>
                <CheckboxGroup
                  d='flex'
                  flexWrap='wrap'
                  variantColor='green'
                  onChange={handleCheckBox}>
                  {Object.entries(vitamins).map(([key, value]) => (
                    <Checkbox key={key} mr={1} value={key}>
                      {value}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </Box>
              <Button type='submit' variantColor='green'>
                Create
              </Button>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCategoryModal;
