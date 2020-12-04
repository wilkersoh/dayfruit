import gql from "graphql-tag";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($name: String!, $vitamins: [String]) {
    createCategory(name: $name, vitamins: $vitamins) {
      name
      vitamins
    }
  }
`;

export const ADD_FRUIT_MUTATION = gql`
  mutation createFruit(
    $name: String!
    $benefit: String
    $country: String
    $category: String!
  ) {
    createFruit(
      name: $name
      benefit: $benefit
      country: $country
      category: $category
    ) {
      name
      benefit
      country
      category
    }
  }
`;
