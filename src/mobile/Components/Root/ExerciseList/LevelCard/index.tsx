import React, { FC } from "react";
import { useLevels } from "Components/Levels/useLevels";
import styled from "styled-components";
import { colors } from "styles";
import { Typography, Paper } from "@material-ui/core";
import { CircularProgressbar } from "Components/Levels/RightColumn/CircularProgressbar";

interface LevelCardProps {}

const Container = styled(Paper)`
  display: flex;
  height: 92px;
  margin-bottom: 24px;
  padding: 16px 8px;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${colors.grey300};
`;

export const LevelCard: FC<LevelCardProps> = () => {
  const { levelId, progressBarValue } = useLevels();

  return (
    <Container>
      <LeftSide>
        <Typography variant={"h4"}>{levelId.toUpperCase()}</Typography>
      </LeftSide>
      <CircularProgressbar value={progressBarValue} isMobile />
    </Container>
  );
};
