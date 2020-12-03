import React, { FC } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const LoadingSpinner: FC = () => (
  <Container>
    <CircularProgress variant={"indeterminate"} />
  </Container>
);
