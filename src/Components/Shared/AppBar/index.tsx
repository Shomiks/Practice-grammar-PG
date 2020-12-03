import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { __RouterContext as RouterContext } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { navigateTo } from "lib/routing";
import { settingsPageOptions } from "Components/Settings";
import { firebaseApp } from "lib/firebase";
import { useCurrentUser } from "lib/useCurrentUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    }
  })
);
const useRouter = () => useContext(RouterContext);

export function useParams() {
  const { match } = useRouter();
  return match.params;
}

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const { location } = useRouter();
  const { currentUser } = useCurrentUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    firebaseApp.auth().signOut();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        disabled={!!currentUser && currentUser.isAnonymous}
        onClick={() => {
          handleMenuClose();
          navigateTo(`/settings/${settingsPageOptions[0].key}`);
        }}
      >
        My account
      </MenuItem>

      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const navigateToLevel = (level: string) => navigateTo(`/levels/${level}`);
  const selectedLevel = location.pathname.split("/")[2];
  const LevelIcon = ({ level }: { level: string }) => (
    <IconButton
      color={selectedLevel === level ? "primary" : "inherit"}
      onClick={() => navigateToLevel(level)}
    >
      <Typography variant={"body1"}>{level.toUpperCase()}</Typography>
    </IconButton>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color={"secondary"}>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => navigateTo("/levels")}
            style={{
              cursor: "pointer"
            }}
          >
            Practice Grammar
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <LevelIcon level={"a1"} />
            <LevelIcon level={"a2"} />
            <LevelIcon level={"b1"} />
            <LevelIcon level={"b2"} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
