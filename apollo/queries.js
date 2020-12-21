import gql from "graphql-tag";

export const GET_FRUTIS_QUERY = gql`
  query getFruits {
    getFruits {
      _id
      name
      category
      country
      createdAt
    }
  }
`;

export const GET_FRUIT_ITEMS_QUERY = gql`
  query getFruitItems($category: String!) {
    getFruitItems(category: $category) {
      name
      country
      createdAt
    }
  }
`;

export const GET_CATEGORY_QUERY = gql`
  query getCategories {
    getCategories {
      _id
      name
      benefit
      vitamins
    }
  }
`;

export const GET_SEARCH_FRUITS_QUERY = gql`
  query getSearchFruits($searchText: String!) {
    getSearchFruits(searchText: $searchText) {
      name
      country
      createdAt
    }
  }
`;
