import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    registerUser: async (
      parent,
      {
        registerInput: {
          username,
          password,
          confirmPassword,
          mobile,
          address,
          email,
        },
      },
      ctx
    ) => {
      // Validator (username, password|confrimPassword, email[if fill in check type] )

      password = await bcrypt.hash(password, 12);

      const result = await ctx.db.collection("users").insertOne({
        username,
        password,
        mobile,
        address,
        email,
        createdAt: new Date().toISOString(),
      });

      // JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const { _id, username: name, ...rest } = result.ops[0];
      console.log(_id);
      return {
        username: name,
        id: _id,
        token,
      };
    },
  },
};

export default user;
