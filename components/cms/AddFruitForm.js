import NextLink from "next/link";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { fruitValidate } from "@/utils/validator";
import { GET_FRUTIS_QUERY } from "@/apollo/queries";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  CheckboxGroup,
  Checkbox,
  Textarea,
  Button,
  useToast,
  Link,
} from "@chakra-ui/core";

const vitamins = {
  Vitamin_A: "Vitamin A",
  Vitamin_B1: "Vitamin B1",
  Vitamin_B6: "Vitamin B6",
  Vitamin_C: "Vitamin C",
  Vitamin_E: "Vitamin E",
  Vitamin_C2: "Vitamin C2",
};

const ADD_FRUIT_MUTATION = gql`
  mutation createFruit(
    $name: String!
    $benefit: String
    $country: String
    $vitamins: [String]
  ) {
    create_fruit(
      name: $name
      benefit: $benefit
      country: $country
      vitamins: $vitamins
    ) {
      name
      benefit
      country
      vitamins
    }
  }
`;

export default function AddFruitForm({ onClose }) {
  const [fruitVariable, setFruitVariable] = useState({});
  const [formError, setFormError] = useState({});
  const toast = useToast();

  const [addFruit] = useMutation(ADD_FRUIT_MUTATION, {
    update(cache, result) {
      const cachedData = cache.readQuery({
        query: GET_FRUTIS_QUERY,
      });

      cachedData.getFruits = [
        {
          ...result.data.create_fruit,
          createdAt: new Date().toISOString(),
          _id: result.data.create_fruit.name, // this only temporary and must unique.
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
      setFruitVariable(errors);
    },
    variables: fruitVariable,
  });

  const onChange = (e) => {
    e.preventDefault();
    setFruitVariable({ ...fruitVariable, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { valid, errors } = fruitValidate(fruitVariable);

    if (!valid) return setFormError(errors);

    addFruit();
  };

  const handleCheckBox = (data) => {
    setFruitVariable({ ...fruitVariable, ["vitamins"]: data });
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
        {/* <FormLabel htmlFor='image'>Image:</FormLabel>
      <Input type='file' name='image' /> */}
        <FormLabel htmlFor='benefit' mt={1}>
          Benefit
        </FormLabel>
        <Textarea
          name='benefit'
          placeholder='What benefits this fruit brings? '
          size='sm'
          onChange={onChange}
        />
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

        <Button type='submit' variantColor='blue' align='right'>
          Submit
        </Button>
      </FormControl>
    </>
  );
}
