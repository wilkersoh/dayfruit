import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { fruitValidate } from "@/utils/validator";
import { GET_FRUTIS_QUERY, GET_CATEGORY_QUERY } from "@/apollo/queries";
import { ADD_FRUIT_MUTATION } from "@/apollo/mutations";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Select,
  RadioGroup,
  Radio,
} from "@chakra-ui/core";

export default function AddFruitForm({ onClose }) {
  const [fruitVariable, setFruitVariable] = useState({});
  const [formError, setFormError] = useState({});
  const toast = useToast();
  const { loading, error, data: categoryLists } = useQuery(GET_CATEGORY_QUERY);

  const [addFruit] = useMutation(ADD_FRUIT_MUTATION, {
    refetchQueries: [{ query: GET_FRUTIS_QUERY }],
    update(cache, result) {
      toast({
        title: "Fruit created",
        description: `${result.data.createFruit.name} added into database`,
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
    variables: fruitVariable,
  });

  const onChange = (e) => {
    e.preventDefault();
    setFruitVariable({ ...fruitVariable, [e.target.name]: e.target.value });
  };

  const handleSelectOption = (e) => {
    setFruitVariable({ ...fruitVariable, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = fruitValidate(fruitVariable);

    if (!valid) return setFormError(errors);

    addFruit();
  };

  return (
    <>
      <FormControl as='form' onSubmit={onSubmit}>
        <FormControl as='fieldset'>
          <FormLabel htmlFor='category'>
            Category Type
            <Box as='span' ml={1} color='red.300'>
              *
            </Box>
          </FormLabel>
          <RadioGroup
            className='form-category-radio'
            defaultValue='Apple'
            name='category'
            onChange={handleSelectOption}
            spacing={2}>
            {categoryLists &&
              categoryLists.getCategories.map((category) => (
                <Radio
                  variantColor='green'
                  key={category._id}
                  value={category.name}>
                  {category.name}
                </Radio>
              ))}
          </RadioGroup>
        </FormControl>
        <FormControl as='fieldset'>
          <FormLabel htmlFor='name'>
            Name:
            <Box as='span' ml={1} color='red.300'>
              *
            </Box>
          </FormLabel>
          <Input
            type='type'
            id='name'
            name='name'
            aria-describedby='fruit name'
            isInvalid={formError.name && true}
            errorBorderColor='red.300'
            placeholder={formError.name ? formError.name : "Fruit name"}
            onChange={onChange}
          />
        </FormControl>
        <FormControl as='fieldset'>
          <FormLabel htmlFor='country' mt={1}>
            Country
          </FormLabel>
          <Select
            name='country'
            onChange={handleSelectOption}
            placeholder='Choose One Furits Country'>
            <option value='dummyCountry'>Dummy country</option>
          </Select>
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
