import Image from "next/image";
import NextLink from "next/link";
import { Box, Stack, Badge, Text, Link } from "@chakra-ui/core";

const badgeColors = {
  APPLE: "pink",
  ORANGE: "orange",
  GRAPE: "purple",
};

export default function Category({ name, vitamins, benefit }) {
  return (
    <Box
      d='flex'
      w='full'
      minH='200px'
      rounded='20px'
      overflow='hidden'
      boxShadow='lg'
      borderWidth='1px'
      borderRadius={8}
      p={2}
      mb={2}
      borderColor='rgba(255, 255, 255, 0.16)'
      backgroundColor='gray.800'>
      <Box d='flex' alignItems='center'>
        <Box w='150px' h='150px' position='relative'>
          <Image
            src='/images/01.jpg'
            alt='Picture of the fruit'
            layout='fill'
          />
        </Box>
      </Box>
      <Box d='flex' flexDir='column' ml={2} w='full'>
        <Stack isInline align='baseline'>
          <Badge variant='solid' variantColor='teal' px={2}>
            New!
          </Badge>
          <Badge outline variantColor={badgeColors["ORANGE"]} px={2}>
            {name}
          </Badge>
        </Stack>
        <Box my={2} d='flex' flexDir='column'>
          <Text w='full' mb={1}>
            Vitamin:
          </Text>
          <Stack isInline spacing={2} flexWrap='wrap'>
            {vitamins.map((vitamin) => (
              <Badge mb={1} key={vitamin}>
                {vitamin}
              </Badge>
            ))}
          </Stack>
          <Box my={2}>{benefit}</Box>
        </Box>
        <Box mt='auto' textAlign='right' mb={2}>
          <NextLink href={`/fruits/${name.toLowerCase()}`}>
            <Link>See more {`${name.toLowerCase()}`}</Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
}
