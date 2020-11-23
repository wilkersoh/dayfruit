// import { gql } from "apollo-server-micro";

// export const typeDefs = gql`
//   type User {
//     id: ID!
//     username: String!
//     password: String!
//     token: String!
//     mobile: String
//     address: String
//     email: String
//     friends: [Friend]
//   }

//   type Friend {
//     name: String!
//     age: Int
//     userID: Int
//   }

//   type Product {
//     name: String!
//     category: Category!
//     price: Int!
//     quantity: Int!
//     image: String!
//     from: String
//     view: Int
//     description: String
//   }

//   type Query {
//     getUsers: [User]
//   }

//   input RegisterInput {
//     id: ID!
//     username: String!
//     password: String!
//     confirmPassword: String!
//     mobile: String
//     address: String
//     email: String
//     createdAt: String
//   }

//   type Mutation {
//     registerUser(registerInput: RegisterInput): User
//   }

//   type Category {
//     type(type: FruitType): String
//   }

//   enum FruitType {
//     APPLE
//     ORANGE
//     OTHER
//   }
// `;
