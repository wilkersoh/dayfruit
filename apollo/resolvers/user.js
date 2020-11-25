import { UserInputError, AuthenticationError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { validateRegister } from "@/utils/validator";

const setUserAuthCookie = (username, _id, res) => {
  // JWT
  const token = jwt.sign(
    {
      id: _id,
      username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_u", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600, // 1hour
      path: "/",
    })
  );
};

const user = {
  Query: {
    user: async (_parent, _args, _context, _info) => {
      const result = await _context.db
        .collection("users")
        .findOne()
        .then((data) => {
          return data;
        });

      return result;
    },
  },
  Mutation: {
    login: async (parent, args, { db, res }) => {
      const { username, password } = args;
      db.collection;
      // match username and hashPassword with database
      const me = db.collection("users").findOne({ username });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw new UserInputError();

      // refreshing token
      // res.cookie(
      //   "jid",
      //   jwt.sign({ userId: user.id }, "OtherSecretKey", {
      //     expiresIn: "7d",
      //   }),
      //   {
      //     httpOnly: true,
      //   }
      // );

      // setUserAuthCookie(name, _id, res);

      // access token
      return {
        accessToken: "token",
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

      if (hasUser && hasEmail)
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
      if (hasEmail)
        throw new UserInputError("Username is taken", {
          errors: {
            email: "This email is taken",
          },
        });

      password = await bcrypt.hash(password, 12);
      // const authorization = ctx.req.headers["authorization"];

      // if (!authorization) throw new Error("Not authorization");

      // try {
      //   const token = authorization.split(" ")[1];
      //   const payload = verify(token, process.env.JWT_SECRET);
      // } catch (error) {
      //   throw new Error("Not Authorizated", error);
      // }

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

      setUserAuthCookie(username, _id, res);
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
