import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
// @ts-ignore
import { playSound } from "Components/Shared/ExercisesPlayground/TopBar/exerciseAnswerSounds";
import { meQuery } from "lib/useExtraInfoUser";
// @ts-ignore
import levelContentTreeQuery from "Components/Levels/LevelContentTreeQuery.graphql";
import { useCallback } from "react";
import { useLocation, useParams } from "react-router";
import { ExerciseExample, exerciseTypeMapper } from "./index";

interface UseCheckAnswerProps {
  updateCurrentExample(arg: ExerciseExample): void;
}
export type CheckAnswer = (arg: {
  answer: string;
  currentExample?: ExerciseExample;
}) => void;

export const useCheckAnswer = ({
  updateCurrentExample
}: UseCheckAnswerProps) => {
  const { pathname } = useLocation();
  const { levelId, exerciseType = "" } = useParams();

  const [verifyExampleMutation] = useMutation(
    exerciseTypeMapper[exerciseType].verifyExample,
    {
      refetchQueries: [
        { query: meQuery },
        {
          query: levelContentTreeQuery,
          variables: { input: { level: levelId } }
        }
      ]
    }
  );

  const checkAnswer: CheckAnswer = useCallback(
    async ({ answer, currentExample }) => {
      if (!currentExample) return;

      updateCurrentExample({
        answer,
        loading: true
      });
      // writes answering duration in seconds, on every answer to the question,
      // into table trackedUserAnswers. this will help us to determine what
      // questions do users find easy/hard to answer on.
      const { data } = await verifyExampleMutation({
        variables: {
          input: {
            answer,
            exerciseId: currentExample.example.id,
            exerciseType: pathname.split("/")[3],
            answeringDuration:
              moment().diff(currentExample.startAnsweringTime) / 1000
          }
        }
      });

      const { correctAnswer, isCorrect } =
        data && data[`${exerciseType}VerifyAnswer`];

      playSound(isCorrect == "true");

      updateCurrentExample({
        answer,
        correctAnswer,
        isCorrect: isCorrect == "true",
        loading: false
      });
    },
    [updateCurrentExample]
  );

  return { checkAnswer };
};
