import { colors, distances } from "styles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import styled from "styled-components";

const FooterContainer = styled(Grid)`
  background: ${colors.fullWhite};
  padding-top: ${distances.px.large};
  padding-right: ${distances.px.large};
  padding-bottom: ${distances.px.large};
  padding-left: ${distances.px.large};
  height: 102px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Group = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeftItem = styled.div`
  margin-left: 0;
  margin-right: ${distances.px.medium};
  &:last-child {
    margin-right: 0;
  }
`;
const RightItem = styled.div`
  margin-right: 0;
  margin-left: ${distances.px.medium};
  &:first-child {
    margin-left: 0;
  }
`;

export const EmptyFooter = styled.div`
  height: ${distances.px.xlarge};
`;

export interface Props {
  footerLeft?: JSX.Element[];
  footerRight?: JSX.Element[];
}

const Footer = ({ footerLeft = [], footerRight = [] }: Props): JSX.Element => {
  if (footerLeft.length === 0 && footerRight.length === 0) {
    return <EmptyFooter />;
  }

  return (
    <FooterContainer>
      <Row>
        <Group>
          {React.Children.map(
            footerLeft,
            (child): JSX.Element => (
              <LeftItem>{child}</LeftItem>
            )
          )}
        </Group>
        <Group>
          {React.Children.map(
            footerRight,
            (child): JSX.Element => (
              <RightItem>{child}</RightItem>
            )
          )}
        </Group>
      </Row>
    </FooterContainer>
  );
};

Footer.defaultProps = {
  footerLeft: [],
  footerRight: []
};

export default Footer;
