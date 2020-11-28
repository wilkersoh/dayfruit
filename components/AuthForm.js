import { FormControl, FormLabel, Input, Box, Text } from "@chakra-ui/core";

export const SignInForm = ({
  handleSubmit,
  register,
  onSubmit,
  errors,
  children,
}) => {
  return (
    <FormControl
      as='form'
      d='flex'
      flexDir='column'
      height='full'
      onSubmit={handleSubmit(onSubmit)}>
      <Box d='flex' m='auto' flexDir='column' w='full'>
        <Text as='h1' textAlign='center' mb='auto'>
          DAYFRUIT
        </Text>
        <FormLabel mt={2} htmlFor='username'>
          Username
        </FormLabel>
        <Input
          ref={register({
            required: "Please fill in your username",
          })}
          id='username'
          type='text'
          name='username'
        />
        <FormLabel mt={2} htmlFor='password'>
          Password
        </FormLabel>
        <Input
          ref={register({
            required: "Enter your password",
          })}
          id='password'
          type='password'
          name='password'
        />
      </Box>
      {children}
    </FormControl>
  );
};

export const RegisterForm = ({
  handleSubmit,
  register,
  watch,
  onSubmit,
  errors,
  children,
}) => {
  return (
    <FormControl as='form' onSubmit={handleSubmit(onSubmit)}>
      <FormLabel mt={1} htmlFor='username'>
        Username
      </FormLabel>
      <Input
        ref={register({
          required: "Please tell us your name",
        })}
        id='username'
        type='text'
        name='username'
        // focusBorderColor='pink.400'
        isInvalid={errors.username && true}
        errorBorderColor='red.300'
        placeholder={
          errors.username ? "username is required" : "Please Fill in username"
        }
      />
      <FormLabel mt={1} htmlFor='password'>
        Password
      </FormLabel>
      <Input
        ref={register({
          required: "Please fill your password",
        })}
        id='password'
        type='password'
        name='password'
      />
      <FormLabel mt={1} htmlFor='confirmPassword'>
        Password Confirm
      </FormLabel>
      <Input
        ref={register({
          validate: (value) =>
            value === watch("password") || "Passwords don't match.",
        })}
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        isInvalid={errors.confirmPassword && true}
        errorBorderColor='red.300'
        placeholder={
          errors.confirmPassword
            ? "Passwords don't match."
            : "Please fill in password"
        }
      />
      <FormLabel mt={1} htmlFor='mobile'>
        Mobile
      </FormLabel>
      <Input ref={register} type='text' id='mobile' name='mobile' />
      <FormLabel mt={1} htmlFor='address'>
        Address
      </FormLabel>
      <Input ref={register} type='text' id='address' name='address' />
      <FormLabel mt={1} htmlFor='email'>
        Email
      </FormLabel>
      <Input
        ref={register({
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          },
        })}
        isInvalid={errors.email && true}
        errorBorderColor='red.300'
        type='email'
        id='email'
        name='email'
        placeholder={errors.email ? "Invalid email address" : "Emails"}
      />
      {children}
    </FormControl>
  );
};
