import NextLink from "next/link";
import { useAuth } from "@/utils/auth";
import AuthModal from "@/components/AuthModal";
import Container from "@/components/Container";
import Hamburger from "@/icons/Hamburger";
import {
  Box,
  PseudoBox,
  Link,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/core";

const Header = (props) => {
  const { user } = useAuth();

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
        {/* <>
            <PseudoBox
              as='div'
              p={2}
              cursor='pointer'
              _hover={{ color: "#c0c0c0" }}>
              {"Logout"}
            </PseudoBox>
          </> */}
        <AuthModal>
          <PseudoBox p={2} cursor='pointer' _hover={{ color: "#c0c0c0" }}>
            {"Sign In"}
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
};

export default Header;
