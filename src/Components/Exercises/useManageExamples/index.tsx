import { useCallback, useEffect, useState } from "react";
// @ts-ignore
import multipleChoiceExampleQuery from "Components/Exercises/MultipleChoice/MultipleChoiceExampleQuery.graphql";
// @ts-ignore
import multipleChoiceVerifyAnswerQuery from "Components/Exercises/MultipleChoice/MultipleChoiceVerifyAnswerQuery.graphql";
// @ts-ignore
import sentenceWordOrderExampleQuery from "Components/Exercises/SentenceWordOrder/SentenceWordOrderExampleQuery.graphql";
// @ts-ignore
import sentenceWordOrderVerifyAnswerQuery from "Components/Exercises/SentenceWordOrder/SentenceWordOrderVerifyAnswerQuery.graphql";
// @ts-ignore
import tensesMultipleChoiceExampleQuery from "./TensesMultipleChoiceExampleQuery.graphql";
// @ts-ignore
import tensesMultipleChoiceVerifyAnswerQuery from "./TensesMultipleChoiceVerifyAnswerQuery.graphql";

import moment, { Moment } from "moment";
import { useCheckAnswer } from "./useCheckAnswer";
import { GetExample, useGetExample } from "./useGetExample";

export const exerciseTypeMapper = {
  multipleChoice: {
    getExamples: multipleChoiceExampleQuery,
    verifyExample: multipleChoiceVerifyAnswerQuery
  },
  sentenceWordOrder: {
    getExamples: sentenceWordOrderExampleQuery,
    verifyExample: sentenceWordOrderVerifyAnswerQuery
  },
  tensesMultipleChoice: {
    getExamples: tensesMultipleChoiceExampleQuery,
    verifyExample: tensesMultipleChoiceVerifyAnswerQuery
  }
};

export interface ExerciseExample {
  example?: any;
  loading?: boolean;
  answer?: string;
  correctAnswer?: string;
  exerciseKey?: string;
  isCorrect?: boolean;
  startAnsweringTime?: Moment;
}

export interface ManageExample {
  currentExample: ExerciseExample;
  toNextExample: GetExample;
  checkAnswer(arg: string): void;
}

export const useManageExamples = () => {
  const [currentExample, setCurrentExample] = useState<ExerciseExample>();
  const [nextExample, setNextExample] = useState<ExerciseExample>();
  const updateCurrentExample = useCallback(
    (args: ExerciseExample) =>
      setCurrentExample({ ...currentExample, ...args }),
    [currentExample]
  );

  const { checkAnswer } = useCheckAnswer({ updateCurrentExample });
  const { getExample } = useGetExample({ setNextExample });

  const toNextExample = () => {
    updateCurrentExample({ ...nextExample, startAnsweringTime: moment() });
    getExample();
  };

  useEffect(() => {
    getExample();
  }, []);

  if (!currentExample && nextExample) {
    updateCurrentExample({ ...nextExample, startAnsweringTime: moment() });
    getExample();
  }

  return {
    currentExample,
    checkAnswer: (answer: string) => checkAnswer({ answer, currentExample }),
    toNextExample
  };
};
