import Head from "next/head";
import { AuthProvider } from "@/utils/auth";
import { ApolloProvider } from "@apollo/react-hooks";
import { withApollo } from "@/apollo/client";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { SearchProvider } from "@/utils/search";
import { Global, css } from "@emotion/core";
import { Provider } from "next-auth/client";
import { DefaultSeo } from "next-seo";
import theme from "../styles/theme";
import "../styles/globals.css";
import SEO from "next-seo.config";

const GlobalStyle = () => {
  return (
    <>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            background-color: rgb(26, 32, 44);
            color: rgba(255, 255, 255, 0.92);
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          h1 {
            font-weight: 900;
            font-size: 1.8rem;
          }

          /* input {
            color: black !important;
          } */
        `}
      />
    </>
  );
};

function MyApp({ Component, pageProps, apolloClient }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <Provider session={pageProps?.session}>
          <AuthProvider>
            <DefaultSeo {...SEO} />
            <GlobalStyle />
            <SearchProvider>
              <Component {...pageProps} />
            </SearchProvider>
          </AuthProvider>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default withApollo(MyApp);
