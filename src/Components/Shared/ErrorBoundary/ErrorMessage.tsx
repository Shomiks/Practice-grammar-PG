import React from "react";
import styled from "styled-components";
import { colors, distances } from "styles";
import { Button, Typography } from "@material-ui/core";
import { navigateTo } from "lib/routing";

const Container = styled.div`
  background-color: ${colors.blumine};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  padding-top: ${distances.px.large};
  text-align: center;
`;

const StyledButton = styled(Button)`
  background: ${colors.manz};
`;

export const ErrorMessage = () => {
  return (
    <Container>
      <Typography variant={"h2"} color={"textSecondary"}>
        Oops, something went wrong!
      </Typography>
      <ButtonContainer>
        <StyledButton
          variant={"contained"}
          fullWidth
          onClick={() => navigateTo("/levels/a1")}
        >
          Please reload
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};
