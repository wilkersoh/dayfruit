import NextLink from "next/link";

import App from "@/components/cms/App";
import Container from "@/components/cms/Container";
import { Box, Link, Text, Button } from "@chakra-ui/core";
import { useAuthCms } from "@/utils/authCms";

const Card = ({ children }) => (
  <Box
    w={{ sm: "200px", lg: "300px" }}
    h={{ sm: "200px", lg: "300px" }}
    justifyContent='center'
    alignItems='center'
    flexDir='column'
    bg='gray.700'
    borderRadius={8}
    d='flex'>
    {children}
  </Box>
);

export default function index() {
  const { admin } = useAuthCms();

  return (
    <App d='flex' justifyContent='space-around' pt={10}>
      <Card>
        <Text mb={4}>View fruits category</Text>
        <NextLink href='/cms/categories'>
          <Link>
            <Button variantColor='blue'>View Category</Button>
          </Link>
        </NextLink>
      </Card>
      <Card>
        <Text mb={4}>View fruits type</Text>
        <NextLink href='/cms/products'>
          <Link>
            <Button variantColor='blue'>View fruits type</Button>
          </Link>
        </NextLink>
      </Card>
    </App>
  );
}
