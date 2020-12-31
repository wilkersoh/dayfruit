import React from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Box, Text } from "@chakra-ui/core";

export default function GlobalSearch({ fruits }) {
  return (
    <Box flex={1} mx={4} pl={{ lg: 6 }} pt={{ lg: 2 }}>
      {fruits.map(({ name, country, createdAt }) => (
        <React.Fragment key={name}>
          <Box d='flex' my={{ lg: 4 }} flexDir={{ sm: "column", lg: "row" }}>
            <Box width={{ sm: "300px" }} height={{ sm: "300px" }}>
              <Box w='full' h='full' position='relative'>
                <Image
                  src={`/images/${name.toLowerCase()}.jpeg`}
                  alt={`Image ${name}`}
                  layout='fill'
                />
              </Box>
            </Box>
            <Box mt={{ sm: 2, lg: 0 }} ml={{ lg: 4 }} pb={4}>
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
  );
}
