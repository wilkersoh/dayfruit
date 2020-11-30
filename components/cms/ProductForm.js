import { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  CheckboxGroup,
  Checkbox,
  Textarea,
  Button,
} from "@chakra-ui/core";
import { setAccessToken } from "@/apollo/accessToken";

const vitamins = {
  Vitamin_A: "Vitamin A",
  Vitamin_B1: "Vitamin B1",
  Vitamin_B6: "Vitamin B6",
  Vitamin_C: "Vitamin C",
  Vitamin_E: "Vitamin E",
};

const ADD_FRUIT_MUTATION = gql`
  mutation add_fruit(
    $name: String!
    $benefit: String
    $country: String
    $vitamins: [String]
  ) {
    add_fruit(
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

export default function ProductForm() {
  const [fruitVariable, setFruitVariable] = useState({});

  const [addFruit] = useMutation(ADD_FRUIT_MUTATION, {
    update(cache, data) {
      console.log(data);
      console.log("updated");
    },
    onError({ networkError, graphQLErrors }) {
      console.log("hit add fruit eror");
    },
    variables: fruitVariable,
  });

  const onChange = (e) => {
    e.preventDefault();
    setFruitVariable({ ...fruitVariable, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(fruitVariable);
    addFruit();
  };

  const handleCheckBox = (data) => {
    setFruitVariable({ ...fruitVariable, ["vitamins"]: data });
  };

  return (
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
        onChange={onChange}
      />
      {/* <FormLabel htmlFor='image'>Image:</FormLabel>
      <Input type='file' name='image' /> */}
      <FormLabel htmlFor='benefit'>Benefit</FormLabel>
      <Textarea
        name='benefit'
        placeholder='What benefits this fruit brings? '
        size='sm'
        onChange={onChange}
      />
      <FormLabel htmlFor='country'>Country</FormLabel>
      <Input
        type='type'
        name='country'
        id='country'
        aria-describedby='country'
        onChange={onChange}
      />

      <Box d='flex' maxH='155px'>
        <FormLabel htmlFor='vitamins'>Vitamins:</FormLabel>
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
  );
}
