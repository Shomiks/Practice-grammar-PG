import _ from "lodash";
import React, { FC } from "react";
import { ExercisesPlayground } from "Components/Shared";
import { useExtraInfoUser } from "lib/useExtraInfoUser";

import { DailyLimit } from "./DailyLimit";
import { ReportExampleButton } from "./ReportExampleButton";
import { useManageExamples } from "./useManageExamples";
import { MultipleChoice } from "./MultipleChoice";
import { SentenceWordOrder } from "./SentenceWordOrder";

export enum ExerciseTypes {
  sentenceWordOrder = "sentenceWordOrder",
  multipleChoice = "multipleChoice",
  tensesMultipleChoice = "tensesMultipleChoice"
}

export const Exercises: FC = () => {
  const { currentExample, toNextExample, checkAnswer } = useManageExamples();
  const { examplesToday, dailyExampleLimit } = useExtraInfoUser();

  if (_.isEmpty(currentExample) || !currentExample) {
    return null;
  }

  return (
    <ExercisesPlayground>
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
          <ReportExampleButton currentExample={currentExample} />
        </>
      )}
    </ExercisesPlayground>
  );
};
