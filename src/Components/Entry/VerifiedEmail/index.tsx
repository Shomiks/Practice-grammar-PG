import { Box, Grid, Typography } from "@material-ui/core";
import React, { FC, useState, useEffect } from "react";
import { RightSide, LeftSide, Container } from "../StyledEntry";
import { colors } from "styles";
import { Redirect } from "react-router";
import styled from "styled-components";
import { firebase } from "lib/firebase";
import { useLocation } from "react-router-dom";
import { parse } from "query-string";
import { useCurrentUser } from "lib/useCurrentUser";

const StyledContainer = styled(Container)`
  position: absolute;
  top: 0;
  z-index: 99999;
`;

const timeCounter = (timeLeft: number) =>
  timeLeft == 0 ? <Redirect to={`/levels/a1`} /> : timeLeft;

export const VerifiedEmail: FC = () => {
  const { currentUser } = useCurrentUser();
  const location = useLocation();
  const { oobCode } = parse(location.search);

  if (typeof oobCode === "string" && currentUser) {
    firebase
      .auth()
      .applyActionCode(oobCode)
      .then(() => currentUser.reload());
  }

  const COUNT_DOWN_SECONDS = 5;
  const [timeLeft, setTimeLeft] = useState(COUNT_DOWN_SECONDS);

  useEffect(() => {
    setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
    }, 1000);
  }, [timeLeft]);
  return (
    <StyledContainer container>
      <Grid item xs={12} md={6}>
        <LeftSide>
          <Box color={colors.fullWhite} mb={5}>
            <Typography variant="h3">
              Your email has been successfully verified!
            </Typography>
          </Box>
          <Box color={colors.fullWhite}>
            <Typography variant="body1">
              You will be redirected in {timeCounter(timeLeft)}...
            </Typography>
          </Box>
        </LeftSide>
      </Grid>
      <RightSide item md={6} />
    </StyledContainer>
  );
};
