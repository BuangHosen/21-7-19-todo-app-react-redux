import React, { Component } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import LoadingScreen from "./LoadingScreen";

export const auth = (ctx, noRedirect = false) => {
  // if not on server, let check for the token
  if (!ctx) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn && !noRedirect) {
      Router.replace("/login");
    }

    return isLoggedIn;
  }

  return null;
};

const withAuthGuard = WrappedComponent =>
  class WithAuthWrapped extends Component {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
      isLoggedIn: PropTypes.bool
    };

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
      isLoggedIn: false
    };

    constructor(props) {
      super(props);
      this.state = {
        ready: false
      };
    }

    static async getInitialProps(ctx) {
      const isLoggedIn = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, isLoggedIn };
    }

    componentDidMount() {
      // lets do it in client side,
      // we don't have server side validation for auth yet
      let { isLoggedIn } = this.props;

      if (!isLoggedIn) {
        isLoggedIn = auth();
      }

      if (isLoggedIn) {
        this.setState({
          ready: true
        });
      }

      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout = event => {
      if (event.key === "logout") {
        // eslint-disable-next-line no-console
        console.log("logged out from storage!");
        Router.replace("/login");
      }
    };

    render() {
      const { ready } = this.state;

      if (!ready) return <LoadingScreen />;

      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuthGuard;
