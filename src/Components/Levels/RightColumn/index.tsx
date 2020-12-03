import { Button, Divider, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { useCurrentUser } from "lib/useCurrentUser";
import { useParams } from "react-router-dom";
import { navigateTo } from "lib/routing";
import { LevelContentTree_levelContentTree_topics_exercises } from "types/api/LevelContentTree";
import { colors, distances } from "styles";
import styled from "styled-components";
import { CircularProgressbar } from "./CircularProgressbar";

interface RightColumnProps {
  value: number;
  onClick: () => void;
  selectedExercise: LevelContentTree_levelContentTree_topics_exercises;
}

const Container = styled.div`
  padding: 0 ${distances.px.large} ${distances.px.large} ${distances.px.large};
  height: 100%;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60%;
  width: 100%;
`;

const CircularProgressbarContainer = styled.div`
  width: 140px;
  height: 140px;
`;

const ButtonContainer = styled.div`
  padding-top: ${distances.px.large};
  text-align: center;
  height: 40%;
  width: 100%;
`;

const TextContainer = styled.div`
  padding-top: 16px;
`;

const Text = styled(Typography)`
  && {
    color: ${colors.teal900};
    font-size: 11.5px;
  }
`;

const SignupText = styled(Typography)`
  && {
    color: ${colors.teal900};
    cursor: pointer;
    display: inline;
    margin-left: ${distances.px.xsmall};
  }

  &&:hover {
    text-decoration: underline;
  }
`;

const EmphasisedText = styled.span`
  color: ${colors.blumine};
`;

const RightColumn: FC<RightColumnProps> = ({
  value,
  onClick,
  selectedExercise
}) => {
  const { levelId } = useParams();
  const { currentUser } = useCurrentUser();

  const isAnonymous =
    currentUser && currentUser.isAnonymous && levelId !== "a1";

  return (
    <Container>
      <StatsContainer>
        <CircularProgressbarContainer>
          <CircularProgressbar value={value} />
        </CircularProgressbarContainer>
      </StatsContainer>
      <Divider variant={"middle"} />
      <ButtonContainer>
        <Button
          variant={"contained"}
          color={"primary"}
          fullWidth
          onClick={onClick}
          disabled={!!isAnonymous || !selectedExercise.exerciseType}
        >
          Start
        </Button>
        {currentUser && currentUser.isAnonymous ? (
          <TextContainer>
            <Text variant={"caption"}>
              This is a demo. Please sign up if you want to unlock all features.
            </Text>

            <SignupText
              variant={"caption"}
              onClick={() => navigateTo("/signup")}
            >
              (Signup here)
            </SignupText>
          </TextContainer>
        ) : (
          <TextContainer>
            <Text variant={"caption"} color={"textPrimary"}>
              Do you feel like you are seeing the same examples?
            </Text>
            <br />
            <Text variant={"caption"} color={"textPrimary"}>
              To get more examples,
              <EmphasisedText> upgrade your account.</EmphasisedText>
            </Text>
          </TextContainer>
        )}
      </ButtonContainer>
    </Container>
  );
};

export { RightColumn };
