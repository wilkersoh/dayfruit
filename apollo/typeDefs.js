import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID
    username: String!
    accessToken: String #jwt token
    mobile: String
    address: String
    email: String
    createdAt: String!
    # isAdmin: Boolean!
  }

  type Product {
    name: String!
    # category: Category!
    # price: Int!
    # quantity: Int!
    # image: String
    # view: Int
    benefit: String
    country: String
    vitamins: [String]
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    email: String!
    mobile: String
    address: String
  }

  type Query {
    me: User!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    add_fruit(
      name: String!
      benefit: String
      country: String
      vitamins: [String]
    ): Product
  }
`;
