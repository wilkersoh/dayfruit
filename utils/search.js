import React, { useState, useContext, createContext, useEffect } from "react";
import { GET_CATEGORY_QUERY } from "@/apollo/queries";
import { useQuery } from "@apollo/react-hooks";

const searchContext = createContext();

export function SearchProvider({ children }) {
  const search = useProvideSearch();
  return (
    <searchContext.Provider value={search}>{children}</searchContext.Provider>
  );
}

// export to outside then can access this all function
export const useSearch = () => {
  return useContext(searchContext);
};

const useProvideSearch = () => {
  const [search, setSearch] = useState("");
  const [fruitType, setFruitType] = useState("");
  const [vitaminType, setVitaminType] = useState([]);

  useEffect(() => {
    // default Selection
    onFilterFruitType("APPLE");
  }, []);

  const { data } = useQuery(GET_CATEGORY_QUERY);

  const onFilterFruitType = (e) => {
    const name = e.target?.value || e;
    setFruitType(name);

    console.log(data);
    // const category = data.getCategories.filter(
    //   (category) => category.name === name
    // );

    // const vitamins = category[0].vitamins;

    // setVitaminType(vitamins);
  };

  const onFilterVitaminType = (newValues) => {
    setVitaminType(newValues);
  };

  const onSearch = (e) => {
    e.preventDefault();
    //
    const searchValue = e.target.value;
    console.log(searchValue);
    const searchWithoutSlash = searchValue.repalce("/", "");

    setSearch(searchWithoutSlash);
  };

  return {
    onFilterFruitType,
    onFilterVitaminType,
    search,
    onSearch,
    vitaminType,
    fruitType,
    setFruitType,
    setVitaminType,
  };
};
