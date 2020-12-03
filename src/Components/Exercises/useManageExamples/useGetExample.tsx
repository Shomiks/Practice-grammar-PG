import { useApollo } from "lib/useApollo";
import { useCallback } from "react";
import { useParams } from "react-router";
import { ExerciseExample, exerciseTypeMapper } from "./index";

export type GetExample = (arg?: number) => void;

interface UseGetExerciseExample {
  setNextExample(arg: ExerciseExample): void;
}

const useGetExample = ({ setNextExample }: UseGetExerciseExample) => {
  const { client } = useApollo();
  const { exerciseKey = "", exerciseType = "" } = useParams();

  const getExample: GetExample = useCallback(async (howMany = 1) => {
    const { data } = await client.query({
      fetchPolicy: "network-only",
      query: exerciseTypeMapper[exerciseType].getExamples,
      variables: {
        input: {
          howMany,
          key: exerciseKey
        }
      }
    });

    setNextExample({
      answer: undefined,
      correctAnswer: undefined,
      isCorrect: undefined,
      example: data[`${exerciseType}Example`][0],
      // startAnsweringTime: moment(),
      exerciseKey: exerciseKey
    });
  }, []);

  return { getExample };
};

export { useGetExample };
