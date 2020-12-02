import NextLink from "next/link";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { fruitValidate } from "@/utils/validator";
// import { GET_FRUTIS_QUERY } from "@/apollo/queries";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Select,
} from "@chakra-ui/core";

const ADD_FRUIT_MUTATION = gql`
  mutation createFruit($name: String!, $benefit: String, $country: String) {
    createFruit(name: $name, benefit: $benefit, country: $country) {
      name
      benefit
      country
    }
  }
`;

// const GET_CATEGORY_QUERY = gql`
//   query getCategories {
//     getCategories {
//       _id
//       name
//     }
//   }
// `;

export default function AddFruitForm({ onClose }) {
  const [fruitVariable, setFruitVariable] = useState({});
  const [formError, setFormError] = useState({});
  const toast = useToast();
  // const { loading, error, data: categoryOptions } = useQuery(
  //   GET_CATEGORY_QUERY
  // );
  // console.log(categoryOptions);
  const [addFruit] = useMutation(ADD_FRUIT_MUTATION, {
    update(getCategoriescache, result) {
      const cachedData = cache.readQuery({
        query: GET_FRUTIS_QUERY,
      });

      cachedData.getFruits = [
        {
          ...result.data.createFruit,
          createdAt: new Date().toISOString(),
          _id: result.data.createFruit.name, // this only temporary and must unique.
        },
        ...cachedData.getFruits,
      ];

      cache.writeQuery({
        query: GET_FRUTIS_QUERY,
        data: { ...cachedData },
      });

      toast({
        title: "Fruit created",
        description: "Already added into database",
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
    setFruitVariable({ ...fruitVariable, ["categories"]: e.target.value });
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
        <FormLabel htmlFor='benefit' mt={1}>
          Benefit
        </FormLabel>
        <Textarea
          name='benefit'
          placeholder='What benefits this fruit brings? '
          size='sm'
          onChange={onChange}
        />
        <FormLabel htmlFor='category' mt={1}>
          Category
        </FormLabel>
        <Select
          onChange={handleSelectOption}
          placeholder='Select fruit category'>
          {/* {categoryOptions &&
            categoryOptions.getCategories.map(({ _id, name }) => (
              <option key={_id}>{name}</option>
            ))} */}
        </Select>
        <FormLabel htmlFor='country' mt={1}>
          Country
        </FormLabel>
        <Input
          type='type'
          name='country'
          id='country'
          aria-describedby='country'
          onChange={onChange}
        />
        {/* <FormLabel htmlFor='image'>Image:</FormLabel>
        <Input type='file' name='image' /> */}
        <Button type='submit' variantColor='blue' align='right'>
          Submit
        </Button>
      </FormControl>
    </>
  );
}
