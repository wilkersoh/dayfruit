import gql from "graphql-tag";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory(
    $name: String!
    $benefit: String
    $vitamins: [String]
  ) {
    createCategory(name: $name, benefit: $benefit, vitamins: $vitamins) {
      name
      benefit
      vitamins
    }
  }
`;

export const ADD_FRUIT_MUTATION = gql`
  mutation createFruit($name: String!, $country: String, $category: String!) {
    createFruit(name: $name, country: $country, category: $category) {
      name
      country
      category
    }
  }
`;
