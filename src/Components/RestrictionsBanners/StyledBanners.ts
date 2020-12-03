import styled from "styled-components";
import { colors, distances } from "styles";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: ${colors.blumine};
  align-items: center;
  justify-content: center;
  height: 100%;
  display: flex;
  z-index: 9999;
`;

export const ContentContainer = styled.div`
  padding-top: ${distances.px.small};
  overflow: auto;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const LogosContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 125px;
  padding-top: ${distances.px.xxxlarge};
`;
