import React, { FC } from "react";
import { navigateTo } from "lib/routing";
import { ComingSoonChip } from "Components/Shared";
import styled from "styled-components";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper
} from "@material-ui/core";
import { colors, distances } from "styles";
import { LevelContentTree_levelContentTree } from "types/api/LevelContentTree";
import ListIcon from "@material-ui/icons/List";

interface CategoriesProps {
  category: LevelContentTree_levelContentTree;
  levelId: string;
}

const Container = styled(Paper)`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  height: 60%;
  width: 100%;
  margin-bottom: 24px;
  border-radius: 4px;
`;

const Header = styled.div`
  border-radius: 4px;
  color: ${colors.fullWhite};
  background-color: ${colors.blumine};
  flex-basis: 40px;
  border-bottom: 1px solid ${colors.grey100};
  padding: 0 ${distances.px.medium};
`;
const HeaderContent = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const ListItemIcon = styled.div`
  margin-right: ${distances.px.small};
  color: ${colors.grey300};
`;

const HeaderListItem = styled(ListItem)`
  background-color: ${colors.grey50};
`;

export const CategoriesCard: FC<CategoriesProps> = ({ category, levelId }) => {
  if (!category) return null;

  return (
    <Container elevation={4}>
      <Header>
        <HeaderContent>
          <Typography variant={"subtitle1"}>{category.categoryName}</Typography>
        </HeaderContent>
      </Header>
      <Content>
        <List>
          {category.topics.map(topic => (
            <div key={topic.topicKey}>
              {/*
              // @ts-ignore */}
              <HeaderListItem>
                <ListItemIcon>
                  <ListIcon color={"inherit"} />
                </ListItemIcon>
                <ListItemText> {topic.topicName}</ListItemText>
              </HeaderListItem>
              {topic.exercises.map(exercise => (
                <ListItem
                  disabled={!exercise.exerciseType}
                  button
                  key={`item-${exercise.exerciseKey}`}
                  onClick={() =>
                    navigateTo(
                      `/levels/${levelId}/${exercise.exerciseType}/${exercise.exerciseKey}`
                    )
                  }
                >
                  <ListItemText
                    primary={`${exercise.exerciseName} (${exercise.exerciseLevel}/6)`}
                  />
                  {!exercise.exerciseType && <ComingSoonChip />}
                </ListItem>
              ))}
            </div>
          ))}
        </List>
      </Content>
    </Container>
  );
};
