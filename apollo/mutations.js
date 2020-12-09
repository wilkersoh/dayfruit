import gql from "graphql-tag";

export const LOGOUT_USER_MUTATION = gql`
  mutation logout {
    logout
  }
`;

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

export const UPDATE_FRUIT_MUTATION = gql`
  mutation updateFruit(
    $_id: ID!
    $name: String!
    $country: String
    $category: String!
  ) {
    updateFruit(
      _id: $_id
      name: $name
      country: $country
      category: $category
    ) {
      name
      country
      category
    }
  }
`;

export const DELETE_FRUIT_MUTATION = gql`
  mutation deleteFruit($_id: ID!) {
    deleteFruit(_id: $_id)
  }
`;
