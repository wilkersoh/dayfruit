import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

const Auth = (req, res) => NextAuth(req, res, options);

// console.log("Pages:", options.pages);

export default Auth;
