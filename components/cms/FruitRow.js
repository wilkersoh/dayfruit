import { Box, IconButton, Badge } from "@chakra-ui/core";
import DeleteFruitModal from "./DeleteFruitModal";
import EditFruitModal from "./EditFruitModal";
import { Td } from "./Table";

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
