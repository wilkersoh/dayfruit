import { useState } from "react";
import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import User from "@/components/Users";
import { withApollo } from "@/apollo/client";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $confirmPassword: String! # $mobile: String # $address: String # $email: String
  ) {
    registerUser(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        # mobile: $mobile
        # address: $address
        # email: $email
      }
    ) {
      id
      username
      token
    }
  }
`;

const Index = () => {
  const [user, setUser] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(cache, args) {
      console.log(args);
      console.log("updated!!");
    },
    variables: user,
  });

  const onSubmit = (data) => {
    console.log(data);
    setUser(data);
    addUser();
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <User />
      </main>
      <FormControl as='form' onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input
          ref={register({
            required: "Please tell us your name",
          })}
          id='username'
          type='type'
          name='username'
        />
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          ref={register({
            required: "Please fill your password",
          })}
          id='password'
          type='password'
          name='password'
        />
        <FormLabel htmlFor='confirmPassword'>Password Confirm</FormLabel>
        <Input
          ref={register({
            required: "Please fill your password",
          })}
          type='password'
          id='confirmPassword'
          name='confirmPassword'
        />
        {/* <FormLabel htmlFor='mobile'>Mobile</FormLabel>
        <Input type='text' id='mobile' name='mobile' />
        <FormLabel htmlFor='address'>Address</FormLabel>
        <Input type='text' id='address' name='address' />
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input type='email' id='email' name='email' /> */}
        <Button type='submit'>Create</Button>
      </FormControl>
    </div>
  );
};

export default withApollo(Index);
