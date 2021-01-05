import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import App from "@/components/App";
import { useQuery } from "@apollo/react-hooks";
import { Box, Text, SimpleGrid } from "@chakra-ui/core";

import { GET_FRUIT_ITEMS_QUERY } from "@/apollo/queries";
import { useSearch } from "@/utils/search";

export default function Fruits() {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(GET_FRUIT_ITEMS_QUERY, {
    variables: { category: query.name.toUpperCase() },
  });
  const { onFilterFruitType } = useSearch();

  const category = data?.getFruitItems[0]?.category;

  useEffect(() => {
    onFilterFruitType(query.name.toUpperCase());
  }, []);

  if (loading || error || data.getFruitItems.length < 1)
    return (
      <App name='Empty' path={`/fruits/empty`}>
        {loading ? (
          <Box>Loading...</Box>
        ) : error ? (
          <Box>Error..{error.message}</Box>
        ) : (
          <Box>{`${query.name} is empty in our store now.`}</Box>
        )}
      </App>
    );
  return (
    <App
      name={category.charAt(0).toUpperCase() + category.slice(1)}
      path={`/fruits/${category.toLowerCase()}`}>
      <Box flex={1} mx={4} pl={{ lg: 6 }} pt={{ sm: 4, lg: 2 }}>
        {data.getFruitItems.map(({ name, country, createdAt }) => (
          <React.Fragment key={name}>
            <Box d='flex' my={{ lg: 4 }} flexDir={{ sm: "column", lg: "row" }}>
              <Box
                alignSelf='center'
                width={{ sm: "340px" }}
                height={{ sm: "300px" }}>
                <Box w='full' h='full' position='relative'>
                  <Image
                    src={`/images/${category.toLowerCase()}.jpeg`}
                    alt={`Image ${name.toLowerCase()}`}
                    layout='fill'
                  />
                </Box>
              </Box>
              <Box mt={{ sm: 2, lg: 0 }} ml={{ lg: 4 }} pb={4}>
                <SimpleGrid columns={2} spacing={10}>
                  <Box mb={1}>
                    <Text fontWeight='bold'>{name}</Text>
                  </Box>
                  <Box ml={{ sm: "auto", lg: "0" }}>
                    <Text>{format(parseISO(createdAt), "PP")}</Text>
                  </Box>
                </SimpleGrid>
                {country && (
                  <Box>
                    <Text fontSize={14}>From: {country}</Text>
                  </Box>
                )}
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </App>
  );
}
