import UserResolver from "./resolvers/user";
import ProductResolver from "./resolvers/product";

export const resolvers = {
  Query: {
    ...UserResolver.Query,
    ...ProductResolver.Query,
  },

  Mutation: {
    ...UserResolver.Mutation,
    ...ProductResolver.Mutation,
  },
};
