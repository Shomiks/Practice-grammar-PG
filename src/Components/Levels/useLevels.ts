import _ from "lodash";
import { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import {
  LevelContentTree_levelContentTree,
  LevelContentTree_levelContentTree_topics,
  LevelContentTree_levelContentTree_topics_exercises
} from "types/api/LevelContentTree";
// @ts-ignore
import levelContentTreeQuery from "./LevelContentTreeQuery.graphql";

interface LevelContentTreeQuery {
  levelContentTree: LevelContentTree_levelContentTree[];
}

const getTopics = (
  categories: LevelContentTree_levelContentTree[],
  selectedCategory?: LevelContentTree_levelContentTree
): LevelContentTree_levelContentTree_topics[] => {
  if (!selectedCategory) return [];
  const currentCategory = _.find<LevelContentTree_levelContentTree[]>(
    categories,
    {
      categoryKey: selectedCategory.categoryKey
    }
  );

  return _.get(currentCategory, "topics");
};

interface MatchParams {
  levelId: string;
}

export const useLevels = () => {
  const { levelId } = useParams<MatchParams>();

  const [selectedCategory, setSelectedCategory] = useState<
    LevelContentTree_levelContentTree
  >();

  const [selectedExercise, setSelectedExercise] = useState<
    LevelContentTree_levelContentTree_topics_exercises
  >();

  useEffect(() => {
    setSelectedCategory(undefined);
    setSelectedExercise(undefined);
  }, [levelId]);

  const { data, loading: queryLoading } = useQuery<LevelContentTreeQuery>(
    levelContentTreeQuery,
    {
      variables: { input: { level: levelId } }
    }
  );

  let categories: LevelContentTree_levelContentTree[] = [];
  let topics: LevelContentTree_levelContentTree_topics[] = [];
  let progressBarValue = 0;

  if (!queryLoading && data) {
    const { levelContentTree } = data;

    if (!selectedCategory || !selectedExercise) {
      setSelectedCategory(levelContentTree[0]);
      setSelectedExercise(levelContentTree[0].topics[0].exercises[0]);
    }

    categories = levelContentTree;
    topics = getTopics(categories, selectedCategory);

    let counter = 0;
    let exerciseLevelSum = 0;
    levelContentTree.forEach(category => {
      category.topics.forEach(topic => {
        topic.exercises.forEach(exercise => {
          if (exercise.exerciseType) {
            counter++;
            exerciseLevelSum = exerciseLevelSum + exercise.exerciseLevel;
          }
        });
      });
    });
    progressBarValue = Math.round((exerciseLevelSum / (6 * counter)) * 100);
  }

  return {
    queryLoading,
    progressBarValue,
    topics,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedExercise,
    setSelectedExercise,
    levelId
  };
};
