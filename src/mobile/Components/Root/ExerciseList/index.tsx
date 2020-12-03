import React, { FC } from "react";
import { useLevels } from "Components/Levels/useLevels";
import { CategoriesCard } from "./CategoriesCard";
import styled from "styled-components";
import { distances } from "styles";
import { LoadingSpinner } from "Components/Shared";

interface ExerciseListProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${distances.px.large};
  flex-grow: 1;
`;

export const ExerciseList: FC<ExerciseListProps> = () => {
  const { categories = [], levelId, queryLoading } = useLevels();

  if (queryLoading) return <LoadingSpinner />;

  return (
    <Container>
      {!queryLoading &&
        categories.map(category => (
          <CategoriesCard
            key={category.categoryKey}
            category={category}
            levelId={levelId}
          />
        ))}
    </Container>
  );
};
