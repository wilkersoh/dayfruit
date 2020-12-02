import gql from "graphql-tag";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($name: String!, $vitamins: [String]) {
    createCategory(name: $name, vitamins: $vitamins) {
      name
      vitamins
    }
  }
`;
