import React from "react";
import { colors, distances } from "styles";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const ContentContainer = styled(Grid)<Pick<Props, "hasNoFooter">>`
  padding-left: ${distances.px.xlarge};
  padding-right: ${distances.px.xlarge};
  padding-top: ${distances.px.xlarge};
  padding-bottom: ${({ hasNoFooter }) =>
    hasNoFooter ? 0 : distances.px.xlarge};
  min-height: 276px;
  max-height: 496px;
  overflow: auto;
  &::-webkit-scrollbar-track {
    background-color: ${colors.grey100};
  }
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.grey300};
    border-radius: 4px;
  }
`;

export interface Props {
  content: () => JSX.Element;
  hasNoFooter?: boolean;
}

const Content = ({ content, hasNoFooter }: Props): JSX.Element => {
  return (
    <ContentContainer item hasNoFooter={hasNoFooter}>
      {content()}
    </ContentContainer>
  );
};

export default Content;
