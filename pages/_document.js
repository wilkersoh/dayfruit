import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  // static async getInitialProps(ctx) {
  //     const initialProps = await NextDocument.getInitialProps(ctx);
  //     return {...initialProps};
  // }

  render() {
    return (
      <Html>
        <Head>
          <meta title='Dayfruit | Find the best drifruitnk deals and happy hours in your area.' />
          <meta name='theme-color' content='#319795'></meta>
          <meta
            property='image'
            content='https://www.fhafnb.com/wp-content/uploads/FHFB-homepage-1-633x630.png'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
