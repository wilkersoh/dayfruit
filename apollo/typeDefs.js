import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    mobile: String
    address: String
    email: String
    createdAt: String!
    # isAdmin: Boolean!
  }

  type Product {
    _id: ID!
    name: String!
    # price: Int!
    # quantity: Int!
    # view: Int
    # image: String
    benefit: String
    country: String
    vitamins: [String]
    categories: [Category]
    createdAt: String!
  }

  type Category {
    _id: ID!
    name: String!
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
    getFruits: [Product]
    getFruit(fruitId: ID!): Product
    getCategories: [Category]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    createFruit(name: String!, benefit: String, country: String): Product
    updateFruit(name: String!, benefit: String, country: String): Product
    deleteFruit(id: ID!): Product
    createCategory(name: String!, vitamins: [String]): Category
  }
`;
