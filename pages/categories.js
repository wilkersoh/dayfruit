import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useSearch } from "@/utils/search";
import App from "@/components/App";
import Category from "@/components/Category";
import { GET_CATEGORY_QUERY } from "@/apollo/queries";

function Categories() {
  const { vitaminType, fruitType } = useSearch();
  const { loading, error, data } = useQuery(GET_CATEGORY_QUERY);
  const allCategories = data ? data.getCategories : [];

  const filteredCategory = allCategories.filter((vitamin) => {
    return vitaminType.some((type) => vitamin.vitamins.includes(type));
  });

  return (
    <App pt={4} px={4}>
      {filteredCategory.map((category) => (
        <Category
          key={category._id}
          name={category.name}
          vitamins={category.vitamins}
          benefit={category.benefit}
        />
      ))}
    </App>
  );
}

export default Categories;
