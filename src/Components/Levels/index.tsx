import { navigateTo } from "lib/routing";
import { CircularProgress, Grid } from "@material-ui/core";
import React, { FC } from "react";
import "react-circular-progressbar/dist/styles.css";
import { colors } from "styles";
import styled from "styled-components";
import { CategoryList } from "./CategoryList";
import { ExercisesList } from "./ExercisesList";
import { RightColumn } from "./RightColumn";
import { useLevels } from "./useLevels";

const LeftColumn = styled(Grid)`
  border-right: 1px solid ${colors.grey100};
  height: 100%;
`;

const MiddleColumn = styled(Grid)`
  border-right: 1px solid ${colors.grey100};
  height: 100%;
  overflow: hidden;
`;

const LoadingContainer = styled(Grid)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Levels: FC = () => {
  const {
    queryLoading,
    progressBarValue,
    topics,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedExercise,
    setSelectedExercise,
    levelId
  } = useLevels();

  return (
    <Grid container style={{ height: "100%" }}>
      {queryLoading || !selectedCategory || !selectedExercise ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <>
          <LeftColumn item xs={3}>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedExercise={setSelectedExercise}
            />
          </LeftColumn>
          <MiddleColumn item xs={4}>
            <ExercisesList
              topics={topics}
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
            />
          </MiddleColumn>
          <Grid item xs={5}>
            <RightColumn
              value={progressBarValue}
              selectedExercise={selectedExercise}
              onClick={() => {
                selectedExercise &&
                  navigateTo(
                    `/levels/${levelId}/${selectedExercise.exerciseType}/${selectedExercise.exerciseKey}`
                  );
              }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};
