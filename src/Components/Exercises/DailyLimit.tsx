import { Box, Button, Typography } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import BatteryAlert from "@material-ui/icons/BatteryAlert";
import { navigateTo } from "lib/routing";
import { SettingsPages } from "Components/Settings";

interface DailyLimitProps {
  dailyExampleLimit: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BatteryAlertStyled = styled(BatteryAlert)`
  && {
    font-size: 44px;
  }
  opacity: 0.8;
`;

const DailyLimit: FC<DailyLimitProps> = ({ dailyExampleLimit }) => (
  <Container>
    <Box mb={2}>
      <BatteryAlertStyled />
    </Box>
    <Box mb={2} textAlign={"center"}>
      <Typography variant={"body1"}>
        You have reached the daily limit of {dailyExampleLimit} examples. In
        order to get more questions either come tomorrow or click on the button
        bellow for more information.
      </Typography>
    </Box>
    <Button
      variant={"contained"}
      color={"primary"}
      onClick={() => navigateTo(`/settings/${SettingsPages.UpdateAccount}`)}
    >
      Ger more examples
    </Button>
  </Container>
);

export { DailyLimit };
