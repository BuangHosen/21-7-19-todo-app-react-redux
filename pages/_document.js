/**
 * A place where we can augment the stuff we want to include in the
 * actual HTML like element within the body tag or inside html.
 * This document will overwrite the default next
 */
import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: [
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(" ")}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>,
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    };
  }

  constructor(props) {
    super(props);

    const { __NEXT_DATA__, ids } = props;

    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="msapplication-TileColor" content="#fff" />
          {/* <link rel="manifest" href="/static/site.webmanifest" /> */}
          {/* <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
          /> */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src *;img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;style-src  'self' 'unsafe-inline' *"
          />
          <meta name="theme-color" content="#ffffff" />
          {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
          {/* eslint-disable-next-line react/no-danger */}
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:400,400i,500,500i,700&display=optional"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
