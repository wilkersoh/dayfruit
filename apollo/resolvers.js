export const resolvers = {
  Query: {
    user: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("users")
        .findOne()
        .then((data) => {
          return data;
        });
      console.log(result);
      return result;
    },
  },
};
