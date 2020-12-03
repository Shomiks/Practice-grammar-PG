import { createMuiTheme, Theme } from "@material-ui/core";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { hotjar } from "react-hotjar";
import { HOTJAR_HJID, HOTJAR_HJSV, NODE_ENV, SENTRY_DSN } from "lib/consts";
import * as Sentry from "@sentry/browser";
// @ts-ignore
import is from "is_js";
import { Root as MobileRoot } from "mobile/Components/Root";

import { useApollo } from "lib/useApollo";
import { history } from "lib/history";

import { ThemeProvider } from "@material-ui/styles";
import { Root } from "./Components/Root";
import { AuthProvider } from "lib/AuthProvider";
import { RestrictionsBanners } from "Components/RestrictionsBanners";
import { colors } from "styles";
import Color from "color";
import { ErrorBoundary } from "Components/Shared/ErrorBoundary";

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.manz,
      dark: Color(colors.manz)
        .alpha(0.85)
        .toString()
    },
    secondary: {
      main: colors.blumine
    }
  },
  typography: {
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

if (NODE_ENV !== "development") {
  // @ts-ignore
  hotjar.initialize(HOTJAR_HJID, HOTJAR_HJSV);
  Sentry.init({
    dsn: SENTRY_DSN
  });
}

const App = () => {
  const { client } = useApollo();
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router history={history}>
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={3}>
                <RestrictionsBanners />
                {is.mobile() ? <MobileRoot /> : <Root />}
              </SnackbarProvider>
            </ThemeProvider>
          </ApolloProvider>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
