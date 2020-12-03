import IconButton from "@material-ui/core/IconButton";
import { Divider, Tooltip } from "@material-ui/core";
import React, { FC } from "react";
import styled from "styled-components";
import { BatteryIcon } from "./BatteryIcon";
import { distances } from "styles";
import { useExtraInfoUser } from "lib/useExtraInfoUser";
import { StreakIndicator } from "./StreakIndicator";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
`;

const Content = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  padding: 0 ${distances.px.small};
  justify-content: space-between;
`;

export const BottomBar: FC = () => {
  const { examplesToday, dailyExampleLimit } = useExtraInfoUser();
  return (
    <Container>
      <Divider />
      <Content>
        <Tooltip
          title={`${examplesToday} out of ${dailyExampleLimit} daily examples remained.`}
          placement="right"
        >
          <IconButton size={"small"}>
            <BatteryIcon
              percentage={Math.round((examplesToday / dailyExampleLimit) * 100)}
            />
          </IconButton>
        </Tooltip>
        <StreakIndicator />
      </Content>
    </Container>
  );
};
