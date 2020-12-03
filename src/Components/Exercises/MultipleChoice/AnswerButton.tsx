import { ExerciseExample } from "../useManageExamples";
import { Button, withStyles } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import React, { FC } from "react";
import { colors, distances } from "styles";

interface AnswerButtonProps {
  currentQuestion: ExerciseExample;
  answer: string;
  onClick: () => void;
}

interface CustomProps {
  state?: string;
}

interface StyledTextFieldProps extends CustomProps, ButtonProps {}

const backgroundColor = ({ state, disabled }: any): string => {
  if (state === "success") {
    return colors.green400;
  }
  if (state === "error") {
    return colors.warningRed600;
  }
  return disabled ? colors.grey100 : colors.manz;
};

const StyledTextField = withStyles({
  root: {
    "&:disabled": {
      backgroundColor: ((props: CustomProps) =>
        backgroundColor({ ...props, disabled: true })) as any,
      color: ({ state }: any): string => {
        if (state === "success" || state === "error") {
          return colors.fullWhite;
        }

        return colors.grey300;
      },
      opacity: 0.5
    },
    "&:hover": {
      backgroundColor: ((props: CustomProps) => backgroundColor(props)) as any,
      opacity: 0.85
    },
    backgroundColor: ((props: CustomProps) => backgroundColor(props)) as any,
    color: ({ state }: CustomProps): string => {
      if (state === "success" || state === "error") {
        return colors.fullWhite;
      }

      return colors.grey600;
    }
  }
})(({ state, ...otherProps }: StyledTextFieldProps) => (
  <Button {...otherProps} />
));

export const AnswerButton: FC<AnswerButtonProps> = ({
  currentQuestion,
  answer,
  onClick
}) => {
  const loading = currentQuestion.loading;
  const buttonState = (): string => {
    currentQuestion.correctAnswer = _.toLower(currentQuestion.correctAnswer);
    currentQuestion.answer = _.toLower(currentQuestion.answer);
    answer = _.toLower(answer);

    if (currentQuestion.correctAnswer === answer) {
      return "success";
    }

    if (
      currentQuestion.correctAnswer &&
      currentQuestion.correctAnswer !== answer &&
      currentQuestion.answer === answer
    ) {
      return "error";
    }

    return "default";
  };

  return (
    <StyledTextField
      disabled={
        (currentQuestion.correctAnswer && currentQuestion.answer !== answer) ||
        loading
      }
      disableRipple
      variant={"contained"}
      color={"primary"}
      fullWidth
      state={buttonState()}
      onClick={() => {
        !currentQuestion.correctAnswer && onClick();
      }}
    >
      {answer}
      {loading && currentQuestion.answer === answer && (
        <CircularProgress
          size={15}
          thickness={5}
          color={"secondary"}
          style={{
            position: "absolute",
            right: distances.px.xlarge
          }}
        />
      )}
    </StyledTextField>
  );
};
