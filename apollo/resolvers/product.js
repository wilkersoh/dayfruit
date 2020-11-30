import { UserInputError, AuthenticationError } from "apollo-server-errors";

const product = {
  Query: {
    //
  },
  Mutation: {
    add_fruit: async (parent, { name, benefit, country, vitamins }, { db }) => {
      let result;
      try {
        result = await db.collection("fruits").insertOne({
          name,
          benefit,
          country,
          vitamins,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        throw new Error("Fail to save data into database.");
      }

      const { _id, ...rest } = result.ops[0];
      return {
        id: _id,
        ...rest,
      };
    },
  },
};

export default product;
