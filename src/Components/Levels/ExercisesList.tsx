import { FormControlLabel, Radio, Typography } from "@material-ui/core";
import { ComingSoonChip, Scrollbar } from "Components/Shared";
import React, { FC } from "react";
import { colors, distances } from "styles";
import styled from "styled-components";
import {
  LevelContentTree_levelContentTree_topics,
  LevelContentTree_levelContentTree_topics_exercises
} from "types/api/LevelContentTree";

interface CategoryListProps {
  topics: LevelContentTree_levelContentTree_topics[];
  selectedExercise: LevelContentTree_levelContentTree_topics_exercises;
  setSelectedExercise: (
    arg0: LevelContentTree_levelContentTree_topics_exercises
  ) => void;
}

const Container = styled(Scrollbar)`
  padding: ${distances.px.xsmall} ${distances.px.small} ${distances.px.small}
    ${distances.px.small};
`;

const TopicTitle = styled.div`
  width: 100%;
  overflow: auto;
  border-bottom: 1px solid ${colors.grey200};
  padding: ${distances.px.small} 0;
`;

const ExerciseTitle = styled.div`
  position: relative;
  width: 100%;
  padding-left: ${distances.px.small};
  line-height: normal;
`;

const StyledTypography = styled(Typography)`
  && {
    line-height: normal;
    font-size: 14px;
    display: flex;
  }
`;

const ExerciseTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ComingSoonChipContainer = styled.div`
  margin: auto ${distances.px.small};
`;

export const ExercisesList: FC<CategoryListProps> = ({
  topics = [],
  selectedExercise,
  setSelectedExercise
}) => (
  <Container>
    {topics.map(topic => (
      <div key={topic.topicKey}>
        <TopicTitle>
          <Typography variant={"body1"}>
            {topic.topicName.toUpperCase()}
          </Typography>
        </TopicTitle>
        {topic.exercises.map(exercise => (
          <ExerciseTitle key={exercise.exerciseKey}>
            <ExerciseTitleContainer>
              <FormControlLabel
                checked={selectedExercise.exerciseKey === exercise.exerciseKey}
                onChange={() => setSelectedExercise(exercise)}
                control={<Radio />}
                disabled={!exercise.exerciseType}
                label={
                  <StyledTypography variant={"caption"}>
                    {exercise.exerciseName} ({exercise.exerciseLevel}/6)
                  </StyledTypography>
                }
              />
              <ComingSoonChipContainer>
                {!exercise.exerciseType && <ComingSoonChip />}
              </ComingSoonChipContainer>
            </ExerciseTitleContainer>
          </ExerciseTitle>
        ))}
      </div>
    ))}
  </Container>
);
