import React, { FC } from "react";
import { distances } from "styles";
import styled from "styled-components";
import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";

const ContentContainer = styled.div`
  height: 353px;
  padding: ${distances.px.medium} 140px;
  position: relative;
`;

export const ExercisesPlayground: FC = ({ children }) => (
  <>
    <TopBar />
    <ContentContainer>{children}</ContentContainer>
    <BottomBar />
  </>
);
