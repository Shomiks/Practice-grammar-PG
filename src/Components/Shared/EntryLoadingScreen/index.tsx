import { CircularProgress } from "@material-ui/core";
import React, { FC } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles";

const SubNav = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 35vh;
  width: 100%;
  background-color: ${colors.teal};
  z-index: -5;
`;

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isLogin }: { isLogin: boolean }) =>
    isLogin ? colors.blumine : colors.ivory};
  z-index: -10;
`;

interface EntryLoadingScreenProps extends RouteComponentProps {}

const EntryLoadingScreen: FC<EntryLoadingScreenProps> = ({ location }) => (
  <>
    <Container isLogin={location.pathname === "/login"}>
      {location.pathname !== "/login" && <SubNav />}
      <CircularProgress />
    </Container>
  </>
);

const EntryLoadingScreenWithRouter = withRouter(EntryLoadingScreen);

export { EntryLoadingScreenWithRouter as EntryLoadingScreen };
