import Head from "next/head";
import { AuthProvider } from "@/utils/auth";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import theme from "../styles/theme";
import "../styles/globals.css";

const GlobalStyle = () => {
  return (
    <>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <CSSReset />
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
