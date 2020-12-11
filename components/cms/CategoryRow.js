import { Box, IconButton, Badge } from "@chakra-ui/core";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { Td } from "./Table";

const labelColors = {
  A: "green",
  B: "purple",
  C: "red",
};

const VitaminLabel = ({ vitamin }) => {
  const [name, type] = vitamin.split("_");
  const color = labelColors[type[0]];
  return (
    <Badge mx={1} variantColor={color}>
      {name} {type}
    </Badge>
  );
};

const CategoryRow = ({ name, _id, benefit, vitamins }) => {
  return (
    <Box key={_id} as='tr'>
      <Td fontWeight='medium'>{name}</Td>
      <Td>{benefit}</Td>
      <Td>
        {vitamins.map((vitamin, i) => (
          <VitaminLabel key={i} vitamin={vitamin} />
        ))}
      </Td>
      <Td d='flex'>
        <EditCategoryModal
          id={_id}
          name={name}
          vitamins={vitamins}
          benefit={benefit}>
          <IconButton
            variantColor='teal'
            aria-label='edit'
            size='md'
            icon='edit'
            mx={2}
          />
        </EditCategoryModal>
        <DeleteCategoryModal name={name} _id={_id}>
          <IconButton
            variantColor='red'
            aria-label='delete'
            size='md'
            icon='delete'
          />
        </DeleteCategoryModal>
      </Td>
    </Box>
  );
};

export default CategoryRow;
