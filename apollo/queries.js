import gql from "graphql-tag";

export const GET_FRUTIS_QUERY = gql`
  query getFruits {
    getFruits {
      _id
      name
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
    }
  }
`;

// export const GET_FRUTIS_QUERY = gql`
//   query getFruits($after: String) {
//     getFruits(first: 5, after: $after) {
//       name
//       benefit
//       vitamins
//       createdAt
//     }
//     pageInfo {
//       endCursor
//     }
//   }
// `;
