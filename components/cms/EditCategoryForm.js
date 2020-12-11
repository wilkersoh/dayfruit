import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { categoryValidate, fruitValidate } from "@/utils/validator";
import { GET_CATEGORY_QUERY } from "@/apollo/queries";
import { UPDATE_CATEGORY_MUTATION } from "@/apollo/mutations";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/core";
import { VITAMINS } from "@/utils/VITAMINS";

export default function EditCategoryForm({
  onClose,
  id,
  name,
  benefit,
  vitamins,
}) {
  const [categoryVariable, setCategoryVariable] = useState({
    _id: id,
    name: "",
    benefit: "",
    vitamins: [],
  });

  const [formError, setFormError] = useState({});
  const toast = useToast();

  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION, {
    variables: categoryVariable,
    refetchQueries: [{ query: GET_CATEGORY_QUERY }],
    update(cache, result) {
      // const cachedData = cache.readQuery({
      //   query: GET_CATEGORY_QUERY,
      // });

      // cachedData.getCategories = cachedData.getCategories.map((category) => {
      //   if (category._id === categoryVariable._id) {
      //     return { ...category, ...categoryVariable };
      //   }
      //   return category;
      // });

      // cache.writeQuery({
      //   query: GET_CATEGORY_QUERY,
      //   data: { ...cachedData },
      // });

      toast({
        title: "Category Updated",
        description: `${categoryVariable.name} updated into database`,
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
      setFormError(errors);
    },
  });

  useEffect(() => {
    setCategoryVariable({ _id: id, name, benefit, vitamins });
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setCategoryVariable({
      ...categoryVariable,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckBox = (data) => {
    console.log(data);
    console.log("check tp");
    setCategoryVariable({ ...categoryVariable, ["vitamins"]: data });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = fruitValidate(categoryVariable);

    if (!valid) return setFormError(errors);

    updateCategory();
  };

  return (
    <>
      <FormControl as='form' onSubmit={onSubmit}>
        <FormControl as='fieldset'>
          <FormLabel htmlFor='name'>
            Name:
            <Box as='span' ml={1} color='red.300'>
              *
            </Box>
          </FormLabel>
          <Input
            type='text'
            id='name'
            name='name'
            aria-describedby='fruit name'
            isInvalid={formError.name && true}
            errorBorderColor='red.300'
            placeholder={formError.name ? formError.name : "Fruit name"}
            value={categoryVariable.name}
            onChange={onChange}
          />
        </FormControl>
        <FormControl as='fieldset'>
          <FormLabel htmlFor='benefit' mt={1}>
            Benefit
          </FormLabel>
          <Input
            type='text'
            id='benefit'
            name='benefit'
            placeholder={"Fruit benefit"}
            value={categoryVariable.benefit || ""}
            onChange={onChange}
          />
        </FormControl>
        <FormControl as='fieldset'>
          <FormLabel htmlFor='vitamins' mt={1}>
            Vitamins
          </FormLabel>
          <CheckboxGroup
            className='cms-category-form'
            variantColor='green'
            onChange={handleCheckBox}
            value={categoryVariable.vitamins || [""]}>
            {Object.entries(VITAMINS).map(([key, value]) => (
              <Checkbox key={key} value={key}>
                {value}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </FormControl>
        <Box textAlign='right' mt={4} mb={2}>
          <Button type='submit' variantColor='teal' align='right'>
            Submit
          </Button>
        </Box>
      </FormControl>
    </>
  );
}
