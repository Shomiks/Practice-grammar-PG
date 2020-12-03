import { useEffect, useState } from "react";
import _ from "lodash";
import uniqid from "uniqid";

interface AnswerChip {
  id: string;
  value: string;
}

interface UseSentenceWordOrderProps {
  initialQuestion: string;
  checkAnswer(arg: string): void;
}

export const useSentenceWordOrder = ({
  initialQuestion = "",
  checkAnswer
}: UseSentenceWordOrderProps) => {
  const arrayOfAnswers = initialQuestion
    .split(" ")
    .map(value => ({ value, id: uniqid() }));

  const [answerChips, setAnswerChips] = useState<AnswerChip[]>(
    _.shuffle(arrayOfAnswers)
  );

  const [answer, setAnswer] = useState<AnswerChip[]>([]);

  useEffect(() => {
    setAnswerChips(_.shuffle(arrayOfAnswers));
    setAnswer([]);
  }, [initialQuestion]);

  useEffect(() => {
    if (answerChips.length === 0)
      checkAnswer(answer.map(chip => chip.value).join(" "));
  }, [answerChips]);

  const onChipClick = (chipId: string) => {
    setAnswer([...answer, ...answerChips.filter(chip => chip.id === chipId)]);
    setAnswerChips(answerChips.filter(chip => chip.id !== chipId));
  };

  const onRemove = () => {
    const popped = answer.pop();
    if (popped) {
      setAnswer([...answer]);
      setAnswerChips([...answerChips, popped]);
    }
  };

  return {
    answerChips,
    setAnswerChips,
    onChipClick,
    onRemove,
    answer
  };
};
