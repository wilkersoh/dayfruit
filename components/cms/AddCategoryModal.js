import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
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
  Textarea,
} from "@chakra-ui/core";

import { GET_CATEGORY_QUERY } from "@/apollo/queries";
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

  const { data: _ } = useQuery(GET_CATEGORY_QUERY);

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    update(cache, result) {
      const cachedData = cache.readQuery({
        query: GET_CATEGORY_QUERY,
      });

      cachedData.getCategories = [
        {
          ...result.data.createCategory,
          createdAt: new Date().toISOString(),
          _id: result.data.createCategory.name, // this only temporary and must unique.
        },
        ...cachedData.getCategories,
      ];

      cache.writeQuery({
        query: GET_CATEGORY_QUERY,
        data: { ...cachedData },
      });

      toast({
        title: "Category created.",
        description: `${result.data.createCategory.name} category was created.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError({ networkError, graphQLErrors }) {
      console.log(graphQLErrors);
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
              <FormControl as='fieldset'>
                <FormLabel htmlFor='title'>
                  Category
                  <Box ml={1} as='span' color='red.300'>
                    *
                  </Box>
                </FormLabel>
                <Input
                  type='text'
                  placeholder={
                    categoryErrors.name ? categoryErrors.name : "Category name"
                  }
                  autoFocus
                  id='name'
                  name='name'
                  isInvalid={categoryErrors.name && true}
                  errorBorderColor='red.300'
                  onChange={onChange}
                />
              </FormControl>
              <FormControl as='fieldset'>
                <FormLabel htmlFor='benefit' mt={1}>
                  Benefit
                </FormLabel>
                <Textarea
                  name='benefit'
                  placeholder='What benefits this fruit bring? '
                  size='sm'
                  onChange={onChange}
                />
              </FormControl>
              <FormControl as='fieldset' d='flex' maxH='155px' mt={2}>
                <FormLabel htmlFor='vitamins' mt={1}>
                  Vitamins:
                </FormLabel>
                <CheckboxGroup
                  variantColor='green'
                  name='vitamins'
                  className='category-form-vitamin'
                  onChange={handleCheckBox}>
                  {Object.entries(vitamins).map(([key, value]) => (
                    <Checkbox key={key} mr={1} value={key}>
                      {value}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </FormControl>
              <Box textAlign='right'>
                <Button type='submit' variantColor='green' mt={4} mb={2}>
                  Create
                </Button>
              </Box>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCategoryModal;
