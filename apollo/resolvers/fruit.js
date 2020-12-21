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
    getFruitItems: async (_, { category }, { db }) => {
      try {
        const fruits = await db
          .collection("fruits")
          .aggregate([{ $match: { category: category.toUpperCase() } }])
          .toArray();

        return fruits;
      } catch (error) {
        throw new Error("Something wrong to get data", error);
      }
    },
    getSearchFruits: async (_, { searchText }, { db }) => {
      try {
        const fruits = await db
          .collection("fruits")
          .find({
            $or: [{ name: searchText }, { country: searchText }],
          })
          .toArray();

        console.log(fruits);
        return fruits;
      } catch (error) {
        console.log("getSearchfruit error");
        throw new Error("No This result", error);
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
    updateFruit: async (_, { _id, name, country, category }, { db }) => {
      try {
        // updateOne return number 1 or 0; findOneAndUpdate can return updated docs
        await db.collection("fruits").updateOne(
          {
            _id: new ObjectId(_id),
          },
          { $set: { name, country, category } }
        );
      } catch (error) {
        throw new Error("Fail to save data into database.", error);
      }
    },
    deleteFruit: async (_, { _id }, { db }) => {
      try {
        await db.collection("fruits").deleteOne({ _id: new ObjectId(_id) });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default product;
