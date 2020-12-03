import IconButton from "@material-ui/core/IconButton";
import React, { FC, useEffect, useState } from "react";
import { Tooltip, Typography } from "@material-ui/core";
import { useSnackbar } from "Components/Shared/Snackbar/useSnackbar";
import { colors } from "styles";
import styled from "styled-components";
import { useBottomBar } from "../useBottomBar";
import { ExplanationModal } from "./ExplanationModal";

const streakIndicatorMessages = {
  5: "Yay! You have reached the 1st level of mastery. Continue practising!",
  10: "Nice! You have reached the 2nd level of mastery. Keep up the good work!",
  15: "Great! You have reached the 3rd level of mastery. You are becoming really good at this!",
  20: "Wow! You have reached the 4th level of mastery. This is getting easier and easier for you!",
  25: "Amazing! You have reached the 5th level of mastery. You are just five more answers away from becoming a master at this!",
  30: "Congratulations! You have reached the 6th level of mastery. You have mastered this! Now go and master something else."
};

const StyledIconButton = styled(IconButton)`
  && {
    color: ${({ darkMode }: { darkMode: boolean }) =>
      darkMode ? "inherit" : colors.fullWhite};
  }
`;

interface StreakIndicatorProps {
  darkMode?: boolean;
}

export const StreakIndicator: FC<StreakIndicatorProps> = ({
  darkMode = true
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { exerciseStreak, exerciseLevel } = useBottomBar();
  const { pushSnackbar } = useSnackbar();

  useEffect(() => {
    exerciseLevel !== 0 &&
      exerciseStreak === exerciseLevel * 5 &&
      pushSnackbar(streakIndicatorMessages[exerciseStreak], "success");
  }, [exerciseLevel]);

  return (
    <>
      <ExplanationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Tooltip
        title={`Your current streak. Click for more info.`}
        placement="left"
      >
        <StyledIconButton
          darkMode={darkMode}
          size={"small"}
          onClick={() => setIsModalOpen(true)}
        >
          <Typography variant={"body2"}>{exerciseStreak}</Typography>
          {exerciseLevel < 6 && (
            <Typography variant={"body2"}>{"/30"}</Typography>
          )}
        </StyledIconButton>
      </Tooltip>
    </>
  );
};
