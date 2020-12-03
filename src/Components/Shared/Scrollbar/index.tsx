import { colors } from "styles";
import styled from "styled-components";

export const Scrollbar = styled.div`
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: ${colors.grey50};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.grey200};
  }
`;
