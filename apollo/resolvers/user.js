import { UserInputError, AuthenticationError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { createAccessToken } from "@/utils/createAccessToken";

const user = {
  Query: {
    me: async (_parent, _args, { db, req }) => {
      const userCookie = cookie.parse(req.headers.cookie);
      const decoded = jwt.verify(userCookie["auth_u"], process.env.JWT_SECRET);

      const me = await db
        .collection("users")
        .findOne({ _id: "5fbfacf9bb4a32a648cf8146" });

      // console.log(me); cannot get the id.. check it later
      return { username: "me" };
    },
  },
  Mutation: {
    login: async (parent, args, { db, res }) => {
      const { username, password } = args;
      let valid;
      try {
        const me = await db.collection("users").findOne({ username });
        valid = await bcrypt.compare(password, me.password);
      } catch (error) {
        throw new UserInputError("Credential failed", {
          errors: {
            username: "Username dont match",
            password: "Password dont match",
          },
        });
      }

      if (!valid)
        throw new UserInputError("Password invalid", {
          errors: {
            password: "Password dont match.",
          },
        });

      const token = { id: me._id, username };
      const { accessToken } = createAccessToken(res, token);

      return {
        username,
        email: me.email,
      };
    },
    registerUser: async (
      parent,
      { registerInput: { username, password, mobile, address, email } },
      { db, res }
    ) => {
      let result;

      const hasUser = await db.collection("users").findOne({ username });
      const hasEmail = await db.collection("users").findOne({ email });

      if (hasUser && hasEmail.email?.length > 0)
        throw new UserInputError("Username and Email is taken", {
          errors: {
            username: "This username is taken",
            email: "This email is taken",
          },
        });

      if (hasUser)
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      if (hasEmail && email !== undefined)
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This email is taken",
          },
        });

      password = await bcrypt.hash(password, 12);

      try {
        result = await db.collection("users").insertOne({
          username,
          password,
          mobile,
          address,
          email,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        throw new Error(error);
      }

      const { _id } = result.ops[0];

      const token = { id: _id, username };
      const { accessToken } = createAccessToken(res, token);

      return {
        id: _id,
        username,
        mobile,
        address,
        email,
      };
    },
  },
};

export default user;
