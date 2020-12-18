import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import App from "@/components/App";
import { useQuery } from "@apollo/react-hooks";
import { Box, Text } from "@chakra-ui/core";

import { GET_FRUIT_ITEMS_QUERY } from "@/apollo/queries";
import { useSearch } from "@/utils/search";

export default function Fruits() {
  const { query } = useRouter();
  const { loading, error, data } = useQuery(GET_FRUIT_ITEMS_QUERY, {
    variables: { category: query.name.toUpperCase() },
  });
  const { onFilterFruitType } = useSearch();

  useEffect(() => {
    onFilterFruitType(query.name.toUpperCase());
  }, []);

  if (loading || error || data.getFruitItems.length < 1)
    return (
      <App>
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
    <App>
      <Box pl={{ lg: 6 }} pt={{ lg: 2 }}>
        {data.getFruitItems.map(({ name, country, createdAt }) => (
          <React.Fragment key={name}>
            <Box d='flex' my={{ lg: 4 }} flexDir={{ sm: "column", lg: "row" }}>
              <Box width={{ sm: "300px" }} height={{ sm: "300px" }}>
                <Box w='full' h='full' position='relative'>
                  <Image
                    src='/images/01.jpg'
                    alt='Picture of the fruit'
                    layout='fill'
                  />
                </Box>
              </Box>
              <Box mt={{ sm: 2, lg: 0 }} mx={4} pb={4}>
                <Box d='flex' justifyContent='space-between'>
                  <Text fontWeight='bold'>{name}</Text>
                  <Text>{format(parseISO(createdAt), "PP")}</Text>
                </Box>
                <Box>From: {country}</Box>
              </Box>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </App>
  );
}
