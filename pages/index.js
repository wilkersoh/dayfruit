import Head from "next/head";
import NextLink from "next/link";
import { Box, Text, Button, Link, PseudoBox } from "@chakra-ui/core";
import AuthModal from "@/components/AuthModal";
import Container from "@/components/Container";
import { useAuth } from "@/utils/auth";
import { LOGOUT_USER_MUTATION } from "@/apollo/mutations";
import { useMutation } from "@apollo/react-hooks";

import { NextSeo } from "next-seo";

const url = process.env.NEXTAUTH_URL;
const title = "Dayfruit | Home";

const Header = (props) => {
  const { user, setUser, signout, session } = useAuth();

  const [logoutUser] = useMutation(LOGOUT_USER_MUTATION, {
    update() {
      setUser({ user: null });
    },
    onError() {
      console.log("logout failed");
    },
  });

  const onLogout = () => {
    logoutUser();

    signout();
  };

  return (
    <Box
      as='header'
      d='flex'
      alignContent='center'
      justifyContent='space-between'
      p={3}>
      <NextLink href='/'>
        <Link alignSelf='center'>
          <Text>DAYFRUIT</Text>
        </Link>
      </NextLink>
      <Box d='flex'>
        {user.user || session ? (
          <PseudoBox
            onClick={onLogout}
            p={2}
            cursor='pointer'
            _hover={{ color: "#c0c0c0" }}>
            {"Sign Out"}
          </PseudoBox>
        ) : (
          <AuthModal>
            <PseudoBox p={2} cursor='pointer' _hover={{ color: "#c0c0c0" }}>
              {"Sign In"}
            </PseudoBox>
          </AuthModal>
        )}
        <NextLink href='/categories'>
          <Link>
            <PseudoBox
              py={2}
              px={4}
              ml={2}
              borderRadius={6}
              transition={"ease-in-out 350ms"}
              cursor='pointer'
              bg={"#ffffff14"}
              _hover={{ bg: "#ffffff29" }}>
              Find Fruits
            </PseudoBox>
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
};

const Index = () => {
  return (
    <>
      <NextSeo title={title} canonical={url} openGraph={{ url, title }} />
      <Box minH='100vh' d='flex' flexDir='column'>
        <Header />
        <Container d='flex' m='auto'>
          <Box px={2} d='flex' flexDir='column' flex={1} mb={16}>
            <Box m='auto' textAlign='center'>
              <Box mb={8}>
                <Text as='h1'>
                  Find the cheapest fruits deals happenning right now.
                </Text>
                <Text fontSize='lg' mt={3}>
                  dayfruit helps you find the best fruit deals and happy hours
                  in your area. View the cheapest fruits for the day and filter
                  down to exactly what you're searching for.
                </Text>
              </Box>
              <NextLink href='/categories' passHref>
                <Link>
                  <Button variantColor='teal' size='lg'>
                    Let's Get Started
                  </Button>
                </Link>
              </NextLink>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Index;
