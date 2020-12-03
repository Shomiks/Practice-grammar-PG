import { List, ListItem, ListItemText } from "@material-ui/core";
import styled from "styled-components";
import { ComingSoonChip, Scrollbar } from "Components/Shared";
import React, { FC } from "react";
import {
  LevelContentTree_levelContentTree,
  LevelContentTree_levelContentTree_topics_exercises
} from "types/api/LevelContentTree";
import { colors } from "styles";

interface CategoryListProps {
  categories: LevelContentTree_levelContentTree[];
  selectedCategory: LevelContentTree_levelContentTree;
  setSelectedCategory: (arg0: LevelContentTree_levelContentTree) => void;
  setSelectedExercise: (
    arg0: LevelContentTree_levelContentTree_topics_exercises
  ) => void;
}

const StyledListItem = styled(ListItem)`
  &&:hover {
    background: ${colors.blumine100};
  }
  &&.Mui-selected {
    background: ${colors.blumine};
    color: ${colors.fullWhite};
  }
  &&.Mui-selected:hover {
    background: ${colors.blumine};
    color: ${colors.fullWhite};
  }
`;

export const CategoryList: FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedExercise
}) => (
  <Scrollbar>
    <List>
      {categories.map(category => (
        <StyledListItem
          button
          key={category.categoryKey}
          onClick={() => {
            setSelectedCategory(category);
            setSelectedExercise(category.topics[0].exercises[0]);
          }}
          divider
          selected={selectedCategory.categoryKey === category.categoryKey}
          disableRipple
        >
          <ListItemText primary={category.categoryName} />
          {category.categoryStatus && <ComingSoonChip />}
        </StyledListItem>
      ))}
    </List>
  </Scrollbar>
);
