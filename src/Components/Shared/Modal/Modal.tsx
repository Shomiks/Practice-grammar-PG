import { colors } from "styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import MaterialUiModal, { ModalProps } from "@material-ui/core/Modal";
import React from "react";
import styled from "styled-components";

import Content, { Props as ContentProps } from "./Content/Content";
import Footer, { Props as FooterProps } from "./Footer/Footer";
import Header, { Props as HeaderProps } from "./Header/Header";

interface Props
  extends HeaderProps,
    Pick<ContentProps, "content">,
    FooterProps {
  /**
   * The id of the input element.
   */
  open: ModalProps["open"];
  /**
   * The medium size of the modal. Default small.
   */
  medium?: boolean;
  /**
   * The large size of the modal. Default small.
   */
  large?: boolean;
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose: () => void;
  /**
   * Renders a trigger for the modal
   */
  trigger?: () => JSX.Element;
  /**
   * Identifier for Cypress tests
   */
  "data-cy"?: string;
}

const StyledGrid = styled(Grid)`
  background: ${colors.fullWhite};
  border-radius: 4px;
  border: 1px solid ${colors.grey200};
`;

const StyledGridContainer = styled(Grid)`
  &:focus {
    outline: none;
  }
`;
export const Modal = ({
  title,
  subtitle,
  helpText,
  footerLeft,
  footerRight,
  content,
  open,
  onClose,
  medium,
  large,
  trigger,
  "data-cy": dataCy
}: Props): JSX.Element => {
  const modalSize = medium ? 8 : large ? 12 : 6;

  return (
    <React.Fragment>
      <MaterialUiModal
        open={open}
        onEscapeKeyDown={onClose}
        style={{
          display: "flex",
          alignItems: "center"
        }}
        data-cy={dataCy}
      >
        <StyledGridContainer container justify="center">
          <StyledGrid item sm={modalSize}>
            <Header
              title={title}
              subtitle={subtitle}
              helpText={helpText}
              onClose={onClose}
            />
            <Divider />
            <Content
              content={content}
              hasNoFooter={!footerLeft && !footerRight}
            />
            {footerLeft || footerRight ? <Divider /> : null}
            <Footer footerLeft={footerLeft} footerRight={footerRight} />
          </StyledGrid>
        </StyledGridContainer>
      </MaterialUiModal>
      {trigger && trigger()}
    </React.Fragment>
  );
};

export default Modal;
