import { Box, IconButton } from "@chakra-ui/core";
import { Td } from "./Table";

const vitaminLabel = () => {
  //
};

const FruitRow = ({ name, id, benefit, country, vitamins }) => {
  return (
    <Box key={id} as='tr'>
      <Td fontWeight='medium'>{name}</Td>
      <Td>{benefit}</Td>
      <Td>{"vitamins"}</Td>
      <Td>{country}</Td>
      <Td>View more || RemoveButton</Td>
    </Box>
  );
};

export default FruitRow;
