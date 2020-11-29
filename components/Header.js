import NextLink from "next/link";
import { useAuth } from "@/utils/auth";
import AuthModal from "@/components/AuthModal";
import { Box, PseudoBox, Link, Text } from "@chakra-ui/core";

export default function Header() {
  const { user } = useAuth();
  console.log(user);
  return (
    <Box
      as='header'
      d='flex'
      alignContent='center'
      justifyContent='space-between'
      mt={1}
      py={2}>
      <NextLink href='/'>
        <Link alignSelf='center'>
          <Text>DAYFRUIT</Text>
        </Link>
      </NextLink>
      <Box d='flex'>
        <AuthModal>
          <PseudoBox p={2} cursor='pointer' _hover={{ color: "#c0c0c0" }}>
            Sign In
          </PseudoBox>
        </AuthModal>
        <NextLink href='/home'>
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
}
