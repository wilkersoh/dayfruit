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
    price: Int!
    quantity: Int!
    image: String!
    from: String
    view: Int
    description: String
  }

  input RegisterInput {
    username: String!
    password: String!
    # confirmPassword: String
    mobile: String
    address: String
    email: String
  }

  type Query {
    user: User!
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
  }
`;
