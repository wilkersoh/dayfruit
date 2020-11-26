import Head from "next/head";
import { AuthProvider } from "@/utils/auth";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Global, css } from "@emotion/core";
import theme from "../styles/theme";
import "../styles/globals.css";

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

          input {
            color: black !important;
          }
        `}
      />
    </>
  );
};

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
