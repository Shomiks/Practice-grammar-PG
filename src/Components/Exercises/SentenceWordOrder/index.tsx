import _ from "lodash";
import React, { FC } from "react";
import { Box, Chip, Divider, Typography, IconButton } from "@material-ui/core";
import { ExerciseTypes } from "Components/Exercises";
import styled from "styled-components";
import { useSentenceWordOrder } from "./useSentenceWordOrder";
import {
  MoreHoriz as MoreHorizIcon,
  BackspaceOutlined as BackspaceOutlinedIcon,
  ArrowForwardRounded as ArrowForwardRoundedIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from "@material-ui/icons";
import { colors, distances } from "styles";
import { useParams } from "react-router-dom";
import { ManageExample } from "../useManageExamples";

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${distances.px.xxlarge};
  padding-bottom: ${distances.px.medium};
`;

const ChipsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${distances.px.xlarge};
  flex-wrap: wrap;
`;

const StyledChip = styled(Chip)`
  margin-right: ${distances.px.medium};
  margin-bottom: ${distances.px.medium};
`;

const TypographyContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding-right: ${distances.px.xxxlarge};
`;

const StyledCheckIcon = styled(CheckIcon)`
  && {
    color: ${colors.green400};
    margin-left: ${distances.px.xsmall};
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  && {
    margin-left: ${distances.px.xsmall};
  }
`;

const StyledTypography = styled(Typography)`
  && {
    background-color: ${colors.blumine100};
    padding: 0 ${distances.px.small};
    border-radius: ${distances.px.xsmall};
  }
`;

interface SentenceWordOrderProps extends ManageExample {}

export const SentenceWordOrder: FC<SentenceWordOrderProps> = ({
  currentExample,
  toNextExample,
  checkAnswer
}) => {
  const { exerciseType } = useParams();

  const { answerChips, answer, onChipClick, onRemove } = useSentenceWordOrder({
    initialQuestion: _.get(currentExample, ["example", "question"]),
    checkAnswer
  });

  if (exerciseType !== ExerciseTypes.sentenceWordOrder) return null;

  return (
    <>
      <QuestionContainer>
        {answer.length === 0 ? (
          <MoreHorizIcon color={"secondary"} />
        ) : (
          <TypographyContent>
            <Typography variant={"h6"} align={"center"}>
              {answer.map(chip => chip.value).join(" ")}
            </Typography>
            {typeof currentExample.isCorrect !== "undefined" ? (
              currentExample.isCorrect ? (
                <StyledCheckIcon />
              ) : (
                <StyledCloseIcon color={"error"} />
              )
            ) : null}
            <Box
              position={"absolute"}
              right={0}
              display={"flex"}
              alignItems={"center"}
            >
              {currentExample.answer ? (
                <IconButton color="inherit" onClick={() => toNextExample()}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
              ) : (
                <IconButton color="inherit" onClick={onRemove}>
                  <BackspaceOutlinedIcon opacity={0.4} />
                </IconButton>
              )}
            </Box>
          </TypographyContent>
        )}
      </QuestionContainer>
      <Divider />
      <ChipsContainer>
        {answerChips.map(chip => (
          <StyledChip
            key={chip.id}
            variant={"outlined"}
            label={chip.value}
            onClick={() => onChipClick(chip.id)}
          />
        ))}
        {currentExample.isCorrect === false && (
          <StyledTypography variant={"h6"}>
            {currentExample.correctAnswer}
          </StyledTypography>
        )}
      </ChipsContainer>
    </>
  );
};
