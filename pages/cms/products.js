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
  // const { loading, error, data, fetchMore } = useQuery(GET_FRUTIS_QUERY, {
  //   variables: { after: null },
  // });
  const { loading, error, data, fetchMore } = useQuery(GET_FRUTIS_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  if (error) return <Box>Error in query</Box>;

  if (loading || !data)
    return (
      <Container>
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
          {/* <Box d='flex' justifyContent='space-between' my={3}>
          <h1>Recent Product</h1>
          <AddFruitModal>Add Fruit</AddFruitModal>
        </Box> */}
          {data && <FruitTable w='full' mx='auto' fruits={data.getFruits} />}
          <NextLink href='/cms'>
            <Link>Back</Link>
          </NextLink>
          <Button
            // onClick={() => {
            //   const { endCursor } = data.getFruits.pageInfo;
            //   fetchMore({
            //     variables: { after: endCursor },
            //     updateQuery: (prevResult, { fetchMoreResult }) => {
            //       // https://www.youtube.com/watch?v=lNtQbn7qN-8
            //       console.log(prevResult);
            //       fetchMoreResult.getFruits = [...prevResult.getFruits, ...fetchMoreResult.getFruits];
            //       return fetchMoreResult;
            //     },
            //   });
            // }}
            variantColor='teal'
            variant='solid'>
            More
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Products;
