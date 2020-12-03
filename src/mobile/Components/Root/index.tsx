import React from "react";
import {
  RouteConfigItem,
  RedirectToLogin,
  RedirectToDefaultLevel
} from "Components/Root";
import { useCurrentUser } from "lib/useCurrentUser";
import { Exercises } from "mobile/Components/Root/Exercise";
import { EntryLoadingScreen } from "./EntryLoadingState";
import styled from "styled-components";
import renderRoutes from "utils/renderRoutes";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { ExerciseList } from "./ExerciseList";
import { AppBar } from "./AppBar";

const configAuthorized: RouteConfigItem[] = [
  {
    component: Exercises,
    path: "/levels/:levelId/:exerciseType/:exerciseKey"
  },
  {
    component: ExerciseList,
    path: "/levels/:levelId"
  },
  {
    component: RedirectToDefaultLevel,
    path: "*"
  }
];
const configUnauthorized: RouteConfigItem[] = [
  {
    component: Login,
    path: "/login"
  },
  {
    component: Signup,
    path: "/signup"
  },
  {
    component: RedirectToLogin,
    path: "*"
  }
];
const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Root = () => {
  const { currentUser } = useCurrentUser();
  if (currentUser === undefined) return <EntryLoadingScreen />;

  return (
    <Container>
      {currentUser ? (
        <AppBar>{renderRoutes(configAuthorized)}</AppBar>
      ) : (
        renderRoutes(configUnauthorized)
      )}
    </Container>
  );
};
