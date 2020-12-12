import UserResolver from "./resolvers/user";
import FruitResolver from "./resolvers/fruit";
import CategoryResolver from "./resolvers/category";

export const resolvers = {
  User: {
    isAdmin: (parent) => {
      if (parent.username !== "admin") return false;
      return true;
    },
  },
  Query: {
    ...UserResolver.Query,
    ...FruitResolver.Query,
    ...CategoryResolver.Query,
  },

  Mutation: {
    ...UserResolver.Mutation,
    ...FruitResolver.Mutation,
    ...CategoryResolver.Mutation,
  },
};
