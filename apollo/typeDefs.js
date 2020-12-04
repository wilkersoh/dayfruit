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

  type Fruit {
    _id: ID!
    name: String!
    # price: Int!
    # quantity: Int!
    # view: Int
    # image: String
    benefit: String
    country: String
    vitamins: [String]
    category: String
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
    getFruits: [Fruit]
    getFruit(fruitId: ID!): Fruit
    getCategories: [Category]!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    createFruit(
      name: String!
      benefit: String
      country: String
      category: String!
    ): Fruit
    updateFruit(name: String!, benefit: String, country: String): Fruit
    deleteFruit(id: ID!): Fruit
    createCategory(name: String!, vitamins: [String]): Category
  }
`;
