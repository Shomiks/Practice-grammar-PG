import { Grid, Box } from "@material-ui/core";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { colors } from "styles";
import React, { FC } from "react";
import styled from "styled-components";

export enum SettingsPages {
  UpdatePassword = "updatePassword",
  UpdateBasicInfo = "updateBasicInfo",
  UpdateAccount = "updateAccount"
}

export const settingsPageOptions = [
  {
    name: "Change password",
    key: SettingsPages.UpdatePassword,
    title: "Change your current password"
  },
  {
    name: "Manage basic info",
    key: SettingsPages.UpdateBasicInfo,
    title: "Manage your basic info"
  },
  {
    name: "Upgrade account",
    key: SettingsPages.UpdateAccount,
    title: "Payments are temporarily disabled"
  }
];

const LeftColumn = styled(Grid)`
  border-right: 1px solid ${colors.border};
`;

export const Settings: FC = () => (
  <Box height="100%" display="flex">
    <LeftColumn item xs={4}>
      <LeftSide />
    </LeftColumn>
    <Grid item xs={8}>
      <RightSide />
    </Grid>
  </Box>
);
