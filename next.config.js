require("dotenv").config();

module.exports = {
  distDir: "build",
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    REACT_APP_GOOGLE_KEY: process.env.REACT_APP_GOOGLE_KEY,
  },
};
