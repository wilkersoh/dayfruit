import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/core";

export default function Header(props) {
  return (
    <Box as='header' d='flex' justifyContent='space-between' p={4} {...props}>
      <NextLink href='/cms'>
        <Link>CMS DAYFRUIT</Link>
      </NextLink>
      <Box>Login</Box>
    </Box>
  );
}
