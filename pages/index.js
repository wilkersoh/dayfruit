import Head from "next/head";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import User from "@/components/Users";
import { withApollo } from "@/apollo/client";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

// const REGISTER_USER = gql`
//   mutation registerUser(
//     $username: String!
//     $password: String!
//     $confirmPassword: String!
//     $mobile: String
//     $address: String
//     $email: String
//   ) {
//     register(
//       registerUser: {
//         username: $username
//         password: $password
//         confirmPassword: $confirmPassword
//         mobile: $mobile
//         address: $address
//         email: $email
//       }
//     ) {
//       username
//       mobile
//       address
//       email
//       token
//     }
//   }
// `;

const Index = () => {
  // const { register, handleSubmit, watch, errors } = useForm();
  // const [addUser, { loading }] = useMutation(REGISTER_USER, {
  //   update(cache, args) {
  //     console.log(args);
  //     console.log("updated!!");
  //     debugger;
  //   },
  //   variables: {
  //     username: "yee",
  //     password: "123",
  //     confirmPassword: "123",
  //   },
  // });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <User />
      </main>
      {/* <FormControl as='form'>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input
          ref={register({
            required: "Please tell us your name",
          })}
          id='username'
          type='type'
          name='name'
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
        <Button type='submit'>Create</Button>
      </FormControl> */}
    </div>
  );
};

export default withApollo(Index);
