import React, { FC } from "react";
import { Modal } from "Components/Shared";
import { colors } from "styles";
import styled from "styled-components";
import { Box, Typography, Divider } from "@material-ui/core";

interface ExplanationModalProps {
  isModalOpen: boolean;
  setIsModalOpen(arg: boolean): void;
}

const ColoredText = styled.a`
  color: ${colors.ivory900};
`;

const Container = styled.div`
  text-align: center;
  color: ${colors.grey300};
`;

const StyledDivider = styled(Divider)`
  && {
    background-color: ${colors.grey200};
  }
  width: 220px;
`;

const ExplanationModal: FC<ExplanationModalProps> = ({
  isModalOpen,
  setIsModalOpen
}) => {
  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      title={""}
      open={isModalOpen}
      data-cy="formModal"
      content={() => (
        <Container>
          <Typography variant={"h5"}>
            What are levels of mastery anyway?
          </Typography>
          <Box pt={2} pb={2} justifyContent={"center"} display={"flex"}>
            <StyledDivider />
          </Box>
          <Box textAlign={"left"}>
            <Typography variant={"body1"}>
              There are <ColoredText>6 levels of mastery.</ColoredText>
            </Typography>

            <ul>
              <li>
                1<sup>st</sup> level of mastery - 5 correct answers in a row.
              </li>
              <li>
                2<sup>nd</sup> level of mastery - 10 correct answers in a row.
              </li>
              <li>
                3<sup>rd</sup> level of mastery - 15 correct answers in a row.
              </li>
              <li>
                4<sup>th</sup> level of mastery - 20 correct answers in a row.
              </li>
              <li>
                5<sup>th</sup> level of mastery - 25 correct answers in a row.
              </li>
              <li>
                6<sup>th</sup> level of mastery - 30 correct answers in a row.
              </li>
            </ul>
            <Typography variant={"body1"}>
              Once you reach{" "}
              <ColoredText>
                the 6<sup>th</sup> level
              </ColoredText>
              , you can consider yourself <ColoredText>the master</ColoredText>{" "}
              at the topic that you practiced. This means that you{" "}
              <ColoredText>do not find</ColoredText> that topic{" "}
              <ColoredText>challenging anymore</ColoredText>, and that you can{" "}
              <ColoredText>move on</ColoredText> to practice something else.
            </Typography>

            <Typography variant={"body1"}>
              At the level you are practicing, you can see your{" "}
              <ColoredText>overall success</ColoredText>. We calculate it by
              looking at
              <ColoredText>
                {" "}
                all of your levels of mastery together.
              </ColoredText>
            </Typography>
          </Box>
        </Container>
      )}
    />
  );
};

export { ExplanationModal };
