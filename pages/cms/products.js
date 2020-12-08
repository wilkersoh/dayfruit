import NextLink from "next/link";
import Head from "next/head";
import { useQuery } from "@apollo/react-hooks";
import Container from "@/components/cms/Container";
import ProductTableSkeleton from "@/components/cms/ProductTableSkeleton";
import FruitTable from "@/components/cms/FruitTable";
import AddFruitModal from "@/components/cms/AddFruitModal";

import { GET_FRUTIS_QUERY } from "@/apollo/queries";
import { Box, Button, Link } from "@chakra-ui/core";

const HeaderCreate = (props) => (
  <Box d='flex' justifyContent='space-between' my={3} {...props}>
    <h1>Recent Product</h1>
    <AddFruitModal>Add Fruit</AddFruitModal>
  </Box>
);

function Products() {
  const { loading, error, data, fetchMore } = useQuery(GET_FRUTIS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  if (error) return <Box>Error in query</Box>;

  if (loading || !data)
    return (
      <Container px={10}>
        <HeaderCreate />
        <ProductTableSkeleton w='full' mx='auto' />
      </Container>
    );

  return (
    <>
      <Head>
        <title>CMS</title>
      </Head>
      <Container px={10}>
        <HeaderCreate />
        <Box d='flex' flexDir='column'>
          {data && <FruitTable w='full' mx='auto' fruits={data.getFruits} />}
          <Box d='flex'>
            <Box ml='auto' mt={4}>
              <NextLink href='/cms'>
                <Link>Back</Link>
              </NextLink>
              <Button variantColor='teal' variant='solid' ml={4}>
                More
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Products;
