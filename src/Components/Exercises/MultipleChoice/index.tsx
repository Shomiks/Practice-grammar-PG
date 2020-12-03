import { Divider, Button, Typography } from "@material-ui/core";
import { ManageExample } from "../useManageExamples";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { AnswerButton } from "./AnswerButton";
import { ExerciseTypes } from "Components/Exercises";
import styled from "styled-components";
import { distances } from "styles";

const NextQuestionContainer = styled.div`
  margin-top: ${distances.px.large};
  display: flex;
  justify-content: center;
`;

const QuestionContainer = styled.div`
  text-align: center;
  width: 100%;
  padding-bottom: ${distances.px.medium};
`;
const ButtonContainer = styled.div`
  padding-top: ${distances.px.medium};
`;
const AnswersContainer = styled.div`
  width: 100%;
`;

interface MultipleChoiceProps extends ManageExample {}

export const MultipleChoice: FC<MultipleChoiceProps> = ({
  currentExample,
  toNextExample,
  checkAnswer
}) => {
  const { exerciseType } = useParams();

  if (
    exerciseType !== ExerciseTypes.multipleChoice &&
    exerciseType !== ExerciseTypes.tensesMultipleChoice
  )
    return null;

  return (
    <>
      <QuestionContainer>
        <Typography variant={"h6"}>
          {currentExample.example.question}
        </Typography>
      </QuestionContainer>
      <Divider />
      <AnswersContainer>
        {currentExample.example.answers.map((answer: any) => (
          <ButtonContainer key={answer}>
            <AnswerButton
              currentQuestion={currentExample}
              answer={answer}
              onClick={() => checkAnswer(answer)}
            />
          </ButtonContainer>
        ))}
        {currentExample.answer && currentExample.correctAnswer && (
          <NextQuestionContainer>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => toNextExample()}
              size={"small"}
            >
              Next Question
            </Button>
          </NextQuestionContainer>
        )}
      </AnswersContainer>
    </>
  );
};
