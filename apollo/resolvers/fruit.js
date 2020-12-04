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
    createFruit: async (parent, { name, country, category }, { db }) => {
      let fruitsCursor;
      if (!name || name.trim() === "")
        throw new UserInputError("Name is required", {
          errors: {
            name: "Name is required",
          },
        });

      const uppercaseName = name.toUpperCase();

      const hasName = await db
        .collection("fruits")
        .findOne({ name: uppercaseName });

      if (hasName)
        throw new UserInputError("Not accepted duplicate name value", {
          errors: {
            name: `${uppercaseName} already exist in database`,
          },
        });

      try {
        fruitsCursor = await db.collection("fruits").insertOne({
          name: uppercaseName,
          country,
          category,
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
    updateFruit: async (_, { name, country, vitamins }, { db }) => {
      try {
        // updateOne return number 1 or 0; findOneAndUpdate can return updated docs
        await db.collection("fruits").updateOne(
          {
            _id: new ObjectId("5fc52b2d69dda4254dc9ef51"),
          },
          { $set: { name, country } }
        );
      } catch (error) {
        console.log(error);
        throw new Error("Fail to save data into database.", error);
      }
    },
  },
};

export default product;
