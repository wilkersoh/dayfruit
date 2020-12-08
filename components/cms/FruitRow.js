import { Box, IconButton, Badge } from "@chakra-ui/core";
import DeleteFruitModal from "./DeleteFruitModal";
import EditFruitModal from "./EditFruitModal";
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

const FruitRow = ({ name, _id, country, category }) => {
  return (
    <Box key={_id} as='tr'>
      <Td fontWeight='medium'>{name}</Td>
      <Td>{category}</Td>
      <Td>{country}</Td>
      <Td d='flex'>
        {/* <IconButton
          variantColor='teal'
          aria-label='view'
          size='md'
          icon='view'
        /> */}
        <EditFruitModal
          id={_id}
          name={name}
          category={category}
          country={country}>
          <IconButton
            variantColor='teal'
            aria-label='edit'
            size='md'
            icon='edit'
            mx={2}
          />
        </EditFruitModal>
        <DeleteFruitModal name={name} _id={_id}>
          <IconButton
            variantColor='red'
            aria-label='delete'
            size='md'
            icon='delete'
          />
        </DeleteFruitModal>
      </Td>
    </Box>
  );
};

export default FruitRow;
