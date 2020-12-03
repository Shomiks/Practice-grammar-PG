import React from "react";
import { colors } from "styles";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Close } from "@material-ui/icons";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const HeaderContainer = styled(Grid)`
  background: ${colors.fullWhite};
  position: relative;
  height: 54px;
  display: flex;
  padding-left: 24px;
  padding-right: 64px;
`;

const CloseIconStyled = (styled(Close)`
  position: absolute;
  top: 12px;
  right: 12px;
  &:hover {
    border-radius: 4px;
    background: ${colors.grey100};
    cursor: pointer;
  }
` as unknown) as React.FunctionComponent<SvgIconProps>;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HelperTextContainer = styled.div`
  display: inline-flex;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid ${colors.grey200};
  height: 100%;
`;
export interface Props {
  /**
   * The content of the label.
   */
  title: string;
  /**
   * The content of the subtitle.
   */
  subtitle?: string;
  /**
   * The content of the helpText.
   */
  helpText?: string;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose: () => void;
}

const Header = ({ title, subtitle, helpText, onClose }: Props): JSX.Element => {
  const titleComponent = <Typography variant={"body2"}>{title}</Typography>;

  const subtitleComponent = subtitle ? (
    <Typography variant={"body2"}>{subtitle}</Typography>
  ) : null;

  const helpTextComponent = helpText ? (
    <HelperTextContainer>
      <Typography variant={"body2"}>{helpText}</Typography>
    </HelperTextContainer>
  ) : null;

  return (
    <HeaderContainer container alignItems="center">
      <Grid item>
        <ContentContainer>
          {titleComponent}
          {helpTextComponent}
        </ContentContainer>
        {subtitleComponent}
      </Grid>
      <CloseIconStyled onClick={onClose} />
    </HeaderContainer>
  );
};

export default Header;
