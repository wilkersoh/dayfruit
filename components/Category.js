import Image from "next/image";
import NextLink from "next/link";
import { Box, Stack, Badge, Text, Link } from "@chakra-ui/core";

const badgeColors = {
  APPLE: "pink",
  ORANGE: "orange",
  GRAPE: "purple",
};

export default function Category() {
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
            Orange
          </Badge>
        </Stack>
        <Box my={2} d='flex' flexDir='column'>
          <Text w='full' mb={1}>
            Vitamin:
          </Text>
          <Stack isInline spacing={2} flexWrap='wrap'>
            <Badge mb={1}>Vitamin A</Badge>
            <Badge mb={1}>Vitamin B1</Badge>
            <Badge mb={1}>Vitamin B2</Badge>
            <Badge mb={1}>Vitamin B6</Badge>
            <Badge mb={1}>Vitamin C</Badge>
            <Badge mb={1}>Vitamin E</Badge>
          </Stack>
        </Box>
        <Box mt='auto' textAlign='right' mb={2}>
          <NextLink href={`/fruits/1`}>
            <Link>Read more...</Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
}

// 像这样看起来似乎苹果的zhi营养价值dao并不高，其实，它的营养价值的体现不是简单在维生素上面的，苹果是能较好的改善肠道微环境的（空腹吃苹果就能缓解便秘的
