import Image from "next/image";
import NextLink from "next/link";
import { Box, Stack, Badge, Text, Link } from "@chakra-ui/core";

const badgeColors = {
  APPLE: "pink",
  ORANGE: "orange",
  GRAPE: "purple",
};
const labelColors = {
  A: "green",
  B: "purple",
  C: "red",
  E: "blue",
};

const VitaminLabel = ({ vitamin }) => {
  const [name, type] = vitamin.split("_");
  const color = labelColors[type[0]];
  return (
    <Badge mx={1} mt={2} variantColor={color}>
      {name} {type}
    </Badge>
  );
};

export default function Category({ name, vitamins, benefit }) {
  return (
    <Box
      d='flex'
      flexDir={{ sm: "column", md: "row" }}
      w='full'
      minH='200px'
      rounded='20px'
      overflow='hidden'
      boxShadow='lg'
      borderWidth='1px'
      borderRadius={8}
      p={2}
      mb={2}
      borderColor='rgba(19, 10, 10, 0.16)'
      backgroundColor='gray.800'>
      <Box d='flex' alignItems='center'>
        <Box
          w={{ sm: "300px", md: "150px" }}
          h={{ sm: "300px", md: "150px" }}
          mx='auto'
          position='relative'>
          <Image
            src={`/images/${name.toLowerCase()}.jpeg`}
            alt={`image of ${name.toLowerCase()}`}
            layout='fill'
          />
        </Box>
      </Box>
      <Box d='flex' flexDir='column' mt={{ sm: 3, md: 0 }} ml={2} w='full'>
        <Stack isInline align='baseline'>
          <Badge variant='solid' variantColor='teal' px={2}>
            New!
          </Badge>
          <Badge outline variantColor={badgeColors["ORANGE"]} px={2}>
            {name}
          </Badge>
        </Stack>
        <Box my={2} d='flex' flexDir='column'>
          <Text w='full'>Vitamin:</Text>
          <Stack isInline spacing={2} flexWrap='wrap'>
            {vitamins.map((vitamin, i) => (
              <VitaminLabel key={i} vitamin={vitamin} />
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
