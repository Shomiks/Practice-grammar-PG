import { Typography } from "@material-ui/core";
import { useParams } from "react-router";
import { ManageBasicInfo } from "./ManageBasicInfo";
import { ChangePassword } from "./ChangePassword";
import { UpgradeAccount } from "./UpgradeAccount";
import styled from "styled-components";
import React from "react";
import { colors, distances } from "styles";
import { settingsPageOptions } from "../index";

const Container = styled.div`
  padding: 0 ${distances.px.xxlarge} ${distances.px.large};
  height: 100%;
`;
const Title = styled.div`
  padding: ${distances.px.medium} ${distances.px.large};
  border-bottom: 1px solid ${colors.grey100};
`;

export const RightSide = () => {
  const { settingsPageKey } = useParams();

  return (
    <>
      <Title>
        <Typography variant={"h5"}>
          {
            (
              settingsPageOptions.find(
                option => option.key === settingsPageKey
              ) || {}
            ).title
          }
        </Typography>
      </Title>
      <Container>
        <UpgradeAccount />
        <ChangePassword />
        <ManageBasicInfo />
      </Container>
    </>
  );
};
