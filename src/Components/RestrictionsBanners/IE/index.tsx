import React, { FC } from "react";
import styled from "styled-components";
import chrome from "./chrome.png";
import firefox from "./firefox.png";
import safari from "./safari.png";
import opera from "./opera.png";
import { Box, Typography } from "@material-ui/core";
import { ContentCard } from "Components/Shared";
import { Container, ContentContainer, LogosContainer } from "../StyledBanners";
// @ts-ignore
import is from "is_js";

const BrowserIcon = styled.div`
  cursor: pointer;
  background-image: url(${({ url }: { url: string }) => url});
  background-size: cover;
  width: 125px;
  height: 100%;
  outline: none;
`;

export const IE: FC = () =>
  is.ie() ? (
    <Container>
      <ContentCard>
        <ContentContainer>
          <Box mt={4}>
            <Typography variant={"h2"}>Unsupported browser</Typography>
          </Box>
          <Box textAlign="center" paddingTop="16px">
            <Typography variant={"body1"}>
              You&apos;re using Internet Explorer which we don&apos;t support
              yet.
            </Typography>

            <Typography variant={"body1"}>
              Please use one of these options to improve your experience.
            </Typography>
          </Box>
          <LogosContainer>
            <a href="https://www.google.com/intl/sr/chrome/">
              <BrowserIcon url={chrome} />
            </a>
            <a href="https://www.mozilla.org/en-US/firefox/new/">
              <BrowserIcon url={firefox} />
            </a>
            <a href="https://safari.en.softonic.com/">
              <BrowserIcon url={safari} />
            </a>
            <a href="https://www.opera.com/download">
              <BrowserIcon url={opera} />
            </a>
          </LogosContainer>
        </ContentContainer>
      </ContentCard>
    </Container>
  ) : null;
