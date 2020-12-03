import React from "react";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router";
import { colors, distances } from "styles";
import styled from "styled-components";
import paypal from "./paypal.png";
import { SettingsPages } from "../index";

const Container = styled.div`
  margin-top: ${distances.px.large};
  position: relative;
  height: 80%;
  padding-top: ${distances.px.large};
`;

const FooterContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: ${distances.px.large};
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.div`
  color: ${colors.blumine};
`;

const StyledBox = styled.div`
  color: ${colors.grey300};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${distances.px.large};
`;

const IconContainer = styled.img.attrs({
  src: paypal
})`
  width: 240px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  cursor: pointer;
`;

export const UpgradeAccount = () => {
  const { settingsPageKey } = useParams();

  return SettingsPages.UpdateAccount === settingsPageKey ? (
    <Container>
      <StyledBox>
        <Typography variant={"h6"}>
          <u>Full service will be restored as soon as possible.</u>
        </Typography>
      </StyledBox>
      <StyledBox>
        <Typography variant={"h6"}>
          We apologize for the inconvenience
        </Typography>
        <Typography variant={"h6"}>and thank you for your patience.</Typography>
      </StyledBox>
      <FooterContainer>
        <FooterText>
          <Typography variant={"body2"}>For more information</Typography>
          <Typography variant={"body2"}>please contact us at:</Typography>
          <Typography variant={"body2"}>office@practicegrammar.co.</Typography>
        </FooterText>
        <IconContainer />
      </FooterContainer>
    </Container>
  ) : null;
};
