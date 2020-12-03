import React, { FC, ReactNode } from "react";
import { parse } from "query-string";

import { useCurrentUser } from "lib/useCurrentUser";
import { Redirect, useLocation } from "react-router-dom";
import { ResetPassword } from "Components/Entry/ResetPassword";
import { ContentCard } from "Components/Shared";
import { Container } from "./Container";
import { Levels } from "Components/Levels";
import { Login } from "Components/Entry/Login";
import { Signup } from "Components/Entry/Signup";
import { ForgotPassword } from "Components/Entry/ForgotPassword";
import renderRoutes from "utils/renderRoutes";
import { Settings } from "Components/Settings";
import { EntryLoadingScreen } from "Components/Shared/EntryLoadingScreen";
import { VerifiedEmail } from "Components/Entry/VerifiedEmail";
import { Snackbars } from "./Snackbars";
import { Exercises } from "Components/Exercises";

export const RedirectToDefaultLevel = () => <Redirect to={"/levels/a1"} />;
export const RedirectToLogin = () => <Redirect to={"/login"} />;

export interface RouteConfigItem {
  path: string;
  component: FC | ReactNode;
}

const HandleFirebase = () => {
  const location = useLocation();
  const { mode, oobCode } = parse(location.search);

  switch (mode) {
    case "resetPassword":
      return <Redirect to={`/resetPassword?oobCode=${oobCode}`} />;
    case "verifyEmail": {
      return <Redirect to={`/verifiedEmail?oobCode=${oobCode}`} />;
    }

    default:
      return <Redirect to={"/"} />;
  }
};

const configAuthorised: RouteConfigItem[] = [
  {
    component: Exercises,
    path: "/levels/:levelId/:exerciseType/:exerciseKey"
  },
  {
    component: Settings,
    path: "/settings/:settingsPageKey"
  },
  {
    component: HandleFirebase,
    path: "/firebase"
  },
  {
    component: VerifiedEmail,
    path: "/verifiedEmail"
  },
  {
    component: Levels,
    path: "/levels/:levelId"
  },
  {
    component: RedirectToDefaultLevel,
    path: "/levels"
  },
  {
    component: RedirectToDefaultLevel,
    path: "*"
  }
];

const signupRoute: RouteConfigItem = {
  component: Signup,
  path: "/signup"
};

const configUnauthorized: RouteConfigItem[] = [
  signupRoute,
  {
    component: Login,
    path: "/login"
  },
  {
    component: HandleFirebase,
    path: "/firebase"
  },
  {
    component: ResetPassword,
    path: "/resetPassword"
  },
  {
    component: ForgotPassword,
    path: "/forgotPassword"
  },
  {
    component: RedirectToLogin,
    path: "*"
  }
];

export const Root = () => {
  const { currentUser } = useCurrentUser();
  const location = useLocation();
  const { pathname } = location;

  if (currentUser === undefined) return <EntryLoadingScreen />;

  if (pathname === "/signup" && currentUser && currentUser.isAnonymous)
    return renderRoutes([signupRoute]);

  return currentUser ? (
    <Container>
      <Snackbars />
      <ContentCard>{renderRoutes(configAuthorised)}</ContentCard>
    </Container>
  ) : (
    renderRoutes(configUnauthorized)
  );
};
