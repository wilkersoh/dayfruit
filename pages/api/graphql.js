import { ApolloServer } from "apollo-server-micro";
import { MongoClient } from "mongodb";
import { schema } from "@/apollo/schema";

let db;

const apolloServer = new ApolloServer({
  schema,
  context: async ({ res, req }) => {
    if (!db) {
      try {
        const dbClient = new MongoClient(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db("dayfruit");
      } catch (error) {
        console.log(`error while connecting with graphql context (db)`, error);
      }
    }
    return { db, res, req };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
