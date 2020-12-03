import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLevels } from "Components/Levels/useLevels";

interface MatchParams {
  exerciseKey: string;
}

export const useBottomBar = () => {
  const { categories } = useLevels();
  const [exerciseStreak, setExerciseStreak] = useState(0);
  const [exerciseLevel, setExerciseLevel] = useState(0);

  const { exerciseKey } = useParams<MatchParams>();

  useEffect(() => {
    categories.forEach(category => {
      category.topics.forEach(topic => {
        topic.exercises.forEach(exercise => {
          if (exercise.exerciseKey === exerciseKey) {
            setExerciseStreak(exercise.exerciseStreak);
            setExerciseLevel(exercise.exerciseLevel);
          }
        });
      });
    });
  }, [categories]);

  return {
    exerciseStreak,
    exerciseLevel
  };
};
