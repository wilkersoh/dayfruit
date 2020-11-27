import Head from "next/head";
import NextLink from "next/link";
import { withApollo } from "@/apollo/client";

import { Box, Text, Button, Link } from "@chakra-ui/core";
import Container from "@/components/Container";
import Header from "@/components/Header";

const Index = () => {
  return (
    <>
      <Head>
        <title>Dayfruit | Pontian</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container d='flex' flexDir='column'>
        <Header />
        <Box px={2} d='flex' flexDir='column' flex={1}>
          <Box m='auto' textAlign='center'>
            <Box mb={8}>
              <Text as='h1'>
                Find the cheapest fruits deals happenning right now.
              </Text>
              <Text fontSize='lg' mt={3}>
                dayfruit helps you find the best fruit deals and happy hours in
                your area. View the cheapest fruits for the day and filter down
                to exactly what you're searching for.
              </Text>
            </Box>
            <NextLink href='/home' passHref>
              <Link>
                <Button variantColor='teal' size='lg'>
                  Let's Get Started
                </Button>
              </Link>
            </NextLink>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Index;
