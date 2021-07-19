/**
 * Next.js uses the App component to initialize pages. This will file allow us to customize the feature we want such as:
 * Persisting layout between page changes
 * Keeping state when navigating pages
 * Custom error handling using componentDidCatch
 * Inject additional data into pages
 * Add global CSS
 */
import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { PersistGate } from "redux-persist/integration/react";
import { create } from "jss";
import rtl from "jss-rtl";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { SnackbarProvider } from "notistack";

import createStore from "~/redux";
import "~/config";
import "~/styles/globals.css";
import { createTheme } from "~/theme";

const theme = createTheme({
  direction: "ltr",
  responsiveFontSizes: true,
  theme: "LIGHT"
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Noop = ({ children }) => children;
class AppRoot extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const Layout = Component.Layout || Noop;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StylesProvider jss={jss}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <SnackbarProvider dense maxSnack={3}>
                <Layout>
                  <PersistGate persistor={store.__PERSISTOR} loading={null}>
                    <Component {...pageProps} />
                  </PersistGate>
                </Layout>
              </SnackbarProvider>
            </MuiPickersUtilsProvider>
          </StylesProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(AppRoot));
