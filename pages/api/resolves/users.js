// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const users = {
//   Query: {
//     //
//   },
//   Mutation: {
//     registerUser: async (
//       _,
//       {
//         registerInput: {
//           username,
//           password,
//           confirmPassword,
//           mobile,
//           address,
//           email,
//         },
//       },
//       ctx
//     ) => {
//       // Validator

//       password = await bcrypt.hash(password, 12);
//       const result = await ctx.db.collection("users").insertOne({
//         username,
//         password,
//         mobile,
//         address,
//         email,
//         createdAt: new Date().toISOString(),
//       });

//       const token = jwt.sign(
//         {
//           id: result.id,
//           username: result.username,
//           email: result.email,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       return {
//         ...result.doc,
//         id: result._id,
//         token,
//       };
//     },
//   },
// };

// export default users;
