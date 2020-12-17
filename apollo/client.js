import React from "react";
import Head from "next/head";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http"; // add
import { setContext } from "apollo-link-context"; // add
import fetch from "isomorphic-unfetch"; // add
import { TokenRefreshLink } from "apollo-link-token-refresh"; // add
import jwtDecode from "jwt-decode"; // add
import { getAccessToken, setAccessToken } from "./accessToken"; // add
import { ApolloLink } from "apollo-link"; // add
import cookie from "cookie"; // add
import jwt from "jsonwebtoken";
import { ApolloProvider } from "@apollo/react-hooks";
import { createAccessToken } from "@/utils/createAccessToken";

const isServer = () => typeof window === "undefined";

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    serverAccessToken,
    apolloState,
    ...pageProps
  }) => {
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }
    const client = apolloClient || initApolloClient(apolloState);
    return <PageComponent {...pageProps} apolloClient={client} />;
    // return (
    //   <ApolloProvider client={client}>
    //     <PageComponent {...pageProps} />
    //   </ApolloProvider>
    // );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx;

      let serverAccessToken = "";

      if (isServer() && req?.headers?.cookie) {
        // const cookies = cookie.parse(req.headers.cookie);
        let cookies;
        try {
          cookies = cookie.parse(req.headers.cookie);

          if (cookies.refreshToken) {
            // get new access token;
            const { id, username } = jwt.verify(
              cookies.refreshToken,
              process.env.JWT_REFRESH_SECRET
            );

            const { accessToken, refreshToken } = createAccessToken(res, {
              id,
              username,
            });

            serverAccessToken = accessToken;
          }
        } catch (error) {
          //
          console.log("Not cookies inside");
        }
      }

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient(
        {},
        serverAccessToken
      ));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
          return {};
          // return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
                apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken,
      };
    };
  }

  return WithApollo;
}

let apolloClient = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState, serverAccessToken) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApolloClient(initialState, serverAccessToken);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, serverAccessToken) {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache().restore(initialState);

  const httpLink = new HttpLink({
    uri: `https://dayfruit.staging.selfpaths.com/api/graphql`,
    // uri:
    //   process.env.NODE_ENV !== "production"
    //     ? "http://localhost:3000/api/graphql"
    //     : `https://dayfruit.staging.selfpaths.com/api/graphql`,
    credentials: "include",
    fetch,
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();
      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      console.log("inside fetchAccessToken");
      // return fetch("http://localhost:3000/api/refresh_token", {
      //   method: "POST",
      //   credentials: "include",
      // });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    },
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    console.log(token);
    console.log("check auth link token");
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : "",
      },
    };
  });

  // Check out https://github.com/vercel/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode,
    link: httpLink,
    // link: ApolloLink.from([refreshLink, authLink, httpLink]),
    cache,
  });
}

// function createIsomorphLink() {
//   if (typeof window === "undefined") {
//     const { SchemaLink } = require("apollo-link-schema");
//     const { schema } = require("./schema");
//     return new SchemaLink({ schema });
//   } else {
//     const { HttpLink } = require("apollo-link-http");
//     return new HttpLink({
//       uri: "/api/graphql",
//       credentials: "same-origin",
//     });
//   }
// }
