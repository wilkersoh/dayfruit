import React, { useEffect, useState, useRef } from "react";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/core";
import { gql, useMutation } from "@apollo/react-hooks";
import { useAuth } from "@/utils/auth";
import { Redirect } from "@/utils/redirect";

import Header from "@/components/cms/Header";

const CMSLOGIN_MUTATION = gql`
  mutation cmsLogin($email: String!, $password: String!) {
    cmsLogin(email: $email, password: $password) {
      username
    }
  }
`;

export default function login() {
  const [values, setValues] = useState({});
  const { user, signinWithCustom } = useAuth();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [user]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginCms] = useMutation(CMSLOGIN_MUTATION, {
    variables: values,
    onError(errors) {
      console.log(errors);
    },
    update(cache, { data }) {
      signinWithCustom(data.cmsLogin);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginCms();
  };

  if (user.user) return <Redirect to='/cms' />;

  return (
    <Box d='flex' flexDir='column' width='full' maxW='1280px' mx='auto'>
      <Header />
      <Box m='auto' w='400px' pt={20}>
        <FormControl as='form' onSubmit={onSubmit}>
          <FormControl as='fieldset' mt={4}>
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input
              type='email'
              id='email'
              name='email'
              color='black'
              onChange={onChange}
              aria-describedby='email-helper-text'
              ref={inputRef}
            />
          </FormControl>
          <FormControl as='fieldset' mt={4}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              type='password'
              id='password'
              name='password'
              color='black'
              onChange={onChange}
              aria-describedby='password'
            />
          </FormControl>
          <Button type='submit' mt={8} variantColor='teal' w='full'>
            Sign In
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
