import { useQuery } from "@apollo/client";

import { useSearch } from "@/utils/search";
import { GET_CATEGORY_QUERY } from "@/apollo/queries";
import { VITAMINS } from "@/utils/VITAMINS";
import {
  Box,
  CheckboxGroup,
  Checkbox,
  Text,
  Stack,
  Spinner,
  RadioGroup,
  Radio,
} from "@chakra-ui/core";

export default function Filters({ categories }) {
  const { loading, error, data } = useQuery(GET_CATEGORY_QUERY);
  const {
    onFilterVitaminType,
    onFilterFruitType,
    vitaminType,
    fruitType,
    setFruitType,
    setVitaminType,
  } = useSearch();

  const resetFruitType = () => {
    onFilterFruitType("APPLE");
  };

  return (
    <Stack>
      <Box minH='100px'>
        <Box d='flex' justifyContent='space-between'>
          <Text mb={2} fontWeight='bold'>
            Fruit Type
          </Text>
          <Text onClick={resetFruitType} mb={2} fontWeight='bold'>
            Reset
          </Text>
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <RadioGroup
            onChange={onFilterFruitType}
            value={fruitType}
            variantColor='teal'
            className='sidebar-type-checkbox'>
            {data.getCategories.map((category) => (
              <Radio
                key={category._id}
                value={category.name}
                textTransform='capitalize'>
                {category.name}
              </Radio>
            ))}
          </RadioGroup>
        )}
      </Box>
      <Box minH='100px'>
        <Text mb={2} fontWeight='bold'>
          Vitamins
        </Text>
        <CheckboxGroup
          onChange={onFilterVitaminType}
          value={vitaminType}
          variantColor='teal'
          className='sidebar-type-checkbox'>
          {Object.entries(VITAMINS).map(([key, value]) => (
            <Checkbox key={key} value={key}>
              {value}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Box>
    </Stack>
  );
}
