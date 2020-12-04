import { Box, IconButton, Badge } from "@chakra-ui/core";
import { Td } from "./Table";

const labelColors = {
  A: "green",
  B: "purple",
  C: "red",
};

const VitaminLabel = ({ vitamin }) => {
  // if after underscore first character is A || B || C || D choose change
  const [name, type] = vitamin.split("_");
  const color = labelColors[type[0]];
  return (
    <Badge variantColor={color}>
      {name} {type}
    </Badge>
  );
};

const FruitRow = ({ name, id, country, vitamins }) => {
  return (
    <Box key={id} as='tr'>
      <Td fontWeight='medium'>{name}</Td>
      <Td>removeBenefit</Td>
      <Td>
        remove vitamins
        {/* {vitamins.map((vitamin) => (
          <VitaminLabel key={vitamin} vitamin={vitamin} />
        ))} */}
      </Td>
      <Td>{country}</Td>
      <Td d='flex'>
        <IconButton
          variantColor='teal'
          aria-label='view'
          size='md'
          icon='view'
        />
        <IconButton
          variantColor='teal'
          aria-label='edit'
          size='md'
          icon='edit'
          mx={2}
        />
        <IconButton
          variantColor='red'
          aria-label='delete'
          size='md'
          icon='delete'
        />
      </Td>
    </Box>
  );
};

export default FruitRow;
