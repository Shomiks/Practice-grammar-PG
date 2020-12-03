import { Tab, Box, Tabs, Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { FC } from "react";
import AppBarUI from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import MoreIcon from "@material-ui/icons/MoreVert";
import { firebaseApp } from "lib/firebase";
import { colors, distances } from "styles";
import styled from "styled-components";
import { useLevelId } from "./useLevelId";
import { navigateTo } from "lib/routing";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${distances.px.small} 0;
  color: ${colors.fullWhite};
  opacity: 0.9;
  && {
    height: 36px;
    min-height: 36px;
  }
`;

const TabContainer = styled.div`
  color: ${colors.blumine900};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 132px;
  flex-grow: 1;
  background-color: ${colors.ivory};
  min-height: calc(100% - 132px);
`;

const levelsIds = ["A1", "A2", "B1", "B2"];

export const AppBar: FC = ({ children }) => {
  const { levelId } = useLevelId();
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <MenuItem onClick={() => firebaseApp.auth().signOut()}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBarUI position="fixed" elevation={4} color={"secondary"}>
        <StyledToolbar>
          <Typography variant={"h6"} onClick={() => navigateTo("/level")}>
            Practice Grammar
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={event => setMobileMoreAnchorEl(event.currentTarget)}
          >
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
        <TabContainer>
          <Tabs
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: colors.fullWhite
              }
            }}
            value={levelId}
            onChange={() => {}}
            aria-label="simple tabs example"
          >
            {levelsIds.map(levelId => (
              <Tab
                key={levelId}
                label={
                  <Box fontWeight={400} fontSize={16} color={colors.fullWhite}>
                    <Typography variant={"inherit"} color={"inherit"}>
                      {levelId.toLowerCase()}
                    </Typography>
                  </Box>
                }
                value={levelId.toLowerCase()}
                onClick={() => navigateTo(`/levels/${levelId.toLowerCase()}`)}
              />
            ))}
          </Tabs>
        </TabContainer>
      </AppBarUI>
      {renderMobileMenu}

      <Content>{children}</Content>
    </>
  );
};
