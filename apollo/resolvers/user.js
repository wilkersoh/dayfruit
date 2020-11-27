import { UserInputError, AuthenticationError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { createAccessToken } from "@/utils/createAccessToken";

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
      maxAge: 3600, // 3600 = 1hour
      path: "/",
    })
  );
};

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

      // match username and hashPassword with database
      const me = await db.collection("users").findOne({ username });
      const valid = await bcrypt.compare(password, me.password);

      if (!valid) throw new UserInputError();

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
      if (hasEmail && email !== undefined)
        throw new UserInputError("Email is taken", {
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
