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
