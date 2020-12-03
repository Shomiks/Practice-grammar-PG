import styled from "styled-components";
import { Grid } from "@material-ui/core";
import img from "../Login/login.jpg";
import { colors, distances } from "styles";

export const Container = styled(Grid)`
  overflow: hidden;
  width: 100%;
  background: ${colors.blumine};
  box-sizing: border-box;
`;

export const LeftSide = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  max-width: 460px;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: ${distances.px.xxlarge};
  box-sizing: inherit;
`;

export const RightSide = styled(Grid)`
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  min-height: 100vh;
`;
