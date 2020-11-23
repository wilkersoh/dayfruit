// import usersResolvers from "./users";

// export const resolvers = {
//   Query: {
//     ...usersResolvers.Query,
//   },
//   Mutation: {
//     ...usersResolvers.Mutation,
//   },
// };

// export const resolvers = {
//   User: {
//     friends: async (parent, __, ctx) => {
//       let friend = await ctx.db
//         .collection("friends")
//         .find({ usersID: parent._id.toString() })
//         .toArray();
//       console.log(friend);
//       console.log(parent._id);
//       return friend;
//     },
//   },

//   Query: {
//     getUsers: async (_, __, ctx) => {
//       return ctx.db
//         .collection("users")
//         .find()
//         .toArray()
//         .then((data) => {
//           return data;
//         });
//     },
//   },

//   Category: {
//     type: (_, { type } = { type: "OTHER" }) => {
//       return type;
//     },
//   },
// };
