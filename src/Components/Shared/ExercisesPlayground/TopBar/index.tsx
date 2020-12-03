import { navigateTo } from "lib/routing";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { distances } from "styles";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: auto;
  height: 45px;
  padding: 0 ${distances.px.small};
`;

export const TopBar: FC = () => {
  const [volume, setVolume] = React.useState(
    localStorage.getItem("exerciseSound") == "true"
  );

  useEffect(() => {
    localStorage.setItem("exerciseSound", volume.toString());
  }, [volume]);

  return (
    <>
      <Container>
        <IconButton size={"small"} onClick={() => setVolume(!volume)}>
          {volume ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
        <IconButton size={"small"} onClick={() => navigateTo("/levels")}>
          <CloseIcon />
        </IconButton>
      </Container>
      <Divider />
    </>
  );
};
