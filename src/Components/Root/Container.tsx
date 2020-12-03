import React, { FC } from "react";
import styled from "styled-components";
import { colors } from "styles";

import AppBar from "../Shared/AppBar";

const SubNav = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 35vh;
  width: 100%;
  background-color: ${colors.teal};
  z-index: -5;
`;

const Content = styled.div`
  padding-top: 100px;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.ivory};
  z-index: -10;
`;

export const Container: FC = ({ children }) => (
  <div>
    <AppBar />
    <SubNav />
    <Background />
    <Content>{children}</Content>
  </div>
);
