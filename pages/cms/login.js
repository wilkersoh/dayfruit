import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/core";
import App from "@/components/cms/App";
import { gql, useMutation } from "@apollo/react-hooks";
import { useAuth } from "@/utils/auth";
import { Redirect } from "@/utils/redirect";

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
    inputRef.current.focus();
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
    <App d='flex' pt={10}>
      <Box m='auto'>
        <FormControl as='form' onSubmit={onSubmit}>
          <FormControl as='fieldset'>
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
          <FormControl as='fieldset'>
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
          <Button type='submit' mt={4} variantColor='teal' w='full'>
            Sign In
          </Button>
        </FormControl>
      </Box>
    </App>
  );
}
