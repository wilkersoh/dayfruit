import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSearch } from "@/utils/search";
import App from "@/components/App";
import Category from "@/components/Category";
import { GET_CATEGORY_QUERY, GET_SEARCH_FRUITS_QUERY } from "@/apollo/queries";
import { Text, Box, Spinner } from "@chakra-ui/core";

function Categories() {
  const { vitaminType } = useSearch();
  const { loading, error, data } = useQuery(GET_CATEGORY_QUERY);
  const allCategories = data ? data.getCategories : [];

  const filteredCategory = allCategories.filter((vitamin) => {
    return vitaminType.some((type) => vitamin.vitamins.includes(type));
  });

  const sortedCategory = filteredCategory.sort((a, b) => {
    return (
      /**
        用 ["x", "y" "z"] filter sortCompare的 a value and b value，和裡面的都matched的話 它filtered的length 就會是滿的
        我要 最多的在第一個 所以是 b - a 大到小
      */
      vitaminType.filter((value) => b.vitamins.includes(value)).length -
      vitaminType.filter((value) => a.vitamins.includes(value)).length
    );
  });

  if (loading)
    return (
      <App>
        <Spinner />
      </App>
    );

  return (
    <App pt={4} px={4}>
      {sortedCategory.map((category, i) => (
        <React.Fragment key={category._id}>
          <Category
            name={category.name}
            vitamins={category.vitamins}
            benefit={category.benefit}
          />
          {i === 0 && (
            <Box
              d='flex'
              flexdir='column'
              pt={2}
              mt={6}
              mb={4}
              borderColor='gray.400'
              borderTop='2px'>
              <Text color='gray.400'>
                Other Category includes similar vitamins
              </Text>
            </Box>
          )}
        </React.Fragment>
      ))}
    </App>
  );
}

export default Categories;
