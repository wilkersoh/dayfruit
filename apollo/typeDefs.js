import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    mobile: String
    address: String
    email: String
    isAdmin: Boolean!
    createdAt: String!
  }

  type Fruit {
    _id: ID!
    name: String!
    # price: Int!
    # quantity: Int!
    # view: Int
    # image: String
    country: String
    category: String
    createdAt: String!
  }

  type Category {
    _id: ID!
    name: String!
    benefit: String
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
    me(username: String): User
    # me: User!
    getFruits: [Fruit]
    getFruit(fruitId: ID!): Fruit #hvt completed yet
    getFruitItems(category: String!): [Fruit]!
    getCategories: [Category]!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    cmsLogin(email: String!, password: String!): User
    logout: Boolean!
    createFruit(name: String!, country: String, category: String!): Fruit
    updateFruit(
      _id: ID!
      name: String!
      country: String
      category: String!
    ): Fruit
    deleteFruit(_id: ID!): Boolean!
    createCategory(name: String!, benefit: String, vitamins: [String]): Category
    updateCategory(
      _id: ID!
      name: String!
      benefit: String
      vitamins: [String]
    ): Category
    deleteCategory(_id: ID!): Boolean!
  }
`;
