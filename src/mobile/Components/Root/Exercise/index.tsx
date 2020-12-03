import _ from "lodash";
import { LoadingSpinner } from "Components/Shared";
import styled from "styled-components";
import React, { FC, useState, useEffect } from "react";
import { useExtraInfoUser } from "lib/useExtraInfoUser";
import { colors, distances } from "styles";
import { Tooltip, ClickAwayListener } from "@material-ui/core";

import { DailyLimit } from "Components/Exercises/DailyLimit";
import { ReportExampleButton } from "Components/Exercises/ReportExampleButton";
import { useManageExamples } from "Components/Exercises/useManageExamples";
import { MultipleChoice } from "Components/Exercises/MultipleChoice";
import { SentenceWordOrder } from "Components/Exercises/SentenceWordOrder";
import { BatteryIcon } from "Components/Shared/ExercisesPlayground/BottomBar/BatteryIcon";
import { StreakIndicator } from "Components/Shared/ExercisesPlayground/BottomBar/StreakIndicator";

const Container = styled.div`
  display: flex;
  padding: 0 ${distances.px.xlarge};
`;

const Content = styled.div`
  flex-grow: 1;
`;

const FooterContainer = styled.div`
  height: 32px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  color: ${colors.fullWhite};
`;

const Footer = styled.div`
  background-color: ${colors.blumine};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${distances.px.medium};
`;

export const Exercises: FC = () => {
  const { currentExample, toNextExample, checkAnswer } = useManageExamples();
  const { examplesToday, dailyExampleLimit } = useExtraInfoUser();

  const [open, setOpen] = useState(false);

  useEffect(() => {}, [open]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {currentExample && (
        <Container>
          <Content>
            {examplesToday <= 0 ? (
              <DailyLimit dailyExampleLimit={dailyExampleLimit} />
            ) : (
              <>
                <MultipleChoice
                  currentExample={currentExample}
                  toNextExample={toNextExample}
                  checkAnswer={checkAnswer}
                />
                <SentenceWordOrder
                  currentExample={currentExample}
                  toNextExample={toNextExample}
                  checkAnswer={checkAnswer}
                />
              </>
            )}
            <ReportExampleButton currentExample={currentExample} />
          </Content>
        </Container>
      )}
      {!currentExample && <LoadingSpinner />}
      <FooterContainer>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Footer>
            <>
              <Tooltip
                onClick={handleTooltipOpen}
                title={`${examplesToday} out of ${dailyExampleLimit} daily examples remained.`}
              >
                <BatteryIcon
                  percentage={Math.round(
                    (examplesToday / dailyExampleLimit) * 100
                  )}
                />
              </Tooltip>
            </>
            <StreakIndicator />
          </Footer>
        </ClickAwayListener>
      </FooterContainer>
    </>
  );
};
