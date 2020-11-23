import UserResolver from "./resolvers/user";

export const resolvers = {
  Query: {
    ...UserResolver.Query,
  },

  Mutation: {
    ...UserResolver.Mutation,
  },
};
