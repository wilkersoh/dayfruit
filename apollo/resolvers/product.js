import { UserInputError, AuthenticationError } from "apollo-server-errors";
import { ObjectId } from "mongodb";

const product = {
  Query: {
    getFruits: async (_, __, { db }) => {
      try {
        const fruits = await db
          .collection("fruits")
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        return fruits;
      } catch (error) {
        throw new Error("Something wrong to get data");
      }
    },
  },
  Mutation: {
    create_fruit: async (
      parent,
      { name, benefit, country, vitamins },
      { db }
    ) => {
      let fruitsCursor;
      if (!name || name.trim() === "")
        throw new UserInputError("Name is required", {
          errors: {
            name: "Name is required",
          },
        });

      const hasName = await db.collection("fruits").findOne({ name });

      if (hasName)
        throw new UserInputError("Not accepted duplicate name value", {
          errors: {
            name: 'Not accepted duplicate "name" value',
          },
        });

      try {
        fruitsCursor = await db.collection("fruits").insertOne({
          name,
          benefit,
          country,
          vitamins,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        throw new Error("Fail to save data into database.");
      }

      const { _id, ...rest } = fruitsCursor.ops[0];

      return {
        id: _id,
        ...rest,
      };
    },
    update_fruit: async (_, { name, benefit, country, vitamins }, { db }) => {
      try {
        // updateOne return number 1 or 0; findOneAndUpdate can return updated docs
        await db.collection("fruits").updateOne(
          {
            _id: new ObjectId("5fc52b2d69dda4254dc9ef51"),
          },
          { $set: { name, benefit, country } }
        );
      } catch (error) {
        console.log(error);
        throw new Error("Fail to save data into database.", error);
      }
    },
  },
};

export default product;
