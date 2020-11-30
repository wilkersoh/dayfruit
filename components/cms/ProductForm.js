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

const vitamins = {
  Vitamin_A: "Vitamin A",
  Vitamin_B1: "Vitamin B1",
  Vitamin_B6: "Vitamin B6",
  Vitamin_C: "Vitamin C",
  Vitamin_E: "Vitamin E",
};

const ADD_FRUIT_MUTATION = gql`
  mutation addFruit() {
    add_fruit() {
      #
    }
  }
`;

export default function ProductForm() {
  const { register, handleSubmit, errors } = useForm();
  const [fruitVariable, setFruitVariable] = useState();

  const [addFruit] = useMutation(ADD_FRUIT_MUTATION, {
    update() {
      //
    },
    onError({ networkError, graphQLErrors }) {
      console.log("hit add fruit eror");
    },
    variables: null,
  });

  const onSubmit = (data) => {
    setFruitVariable();
    console.log(data);
  };

  return (
    <FormControl as='form' onSubmit={handleSubmit(onSubmit)}>
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
        ref={register}
      />
      {/* <FormLabel htmlFor='image'>Image:</FormLabel>
      <Input type='file' name='image' /> */}
      <FormLabel htmlFor='brings'>Brings</FormLabel>
      <Textarea
        name='brings'
        placeholder='What benefits this fruit brings? '
        size='sm'
        ref={register}
      />
      <FormLabel htmlFor='country'>Country</FormLabel>
      <Input
        type='type'
        name='country'
        id='country'
        aria-describedby='country'
      />

      <Box d='flex' maxH='155px'>
        <FormLabel htmlFor='vitamins'>Vitamins:</FormLabel>
        <CheckboxGroup d='flex' flexWrap='wrap' variantColor='green'>
          {Object.entries(vitamins).map(([key, value]) => (
            <Checkbox key={key} mr={1} value={key} ref={register}>
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
