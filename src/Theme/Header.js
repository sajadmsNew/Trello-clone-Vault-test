import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Dashboard, Apps } from "@material-ui/icons";
import { headerStyles } from "./styles";
import { UIContext } from "../context/UIContext";

const Header = () => {
  let history = useNavigate();
  const classes = headerStyles();

  const { showAllBoards, renderedBoard } = useContext(UIContext);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => history.push("/")}
          >
            <Dashboard className={classes.menuIcon} />
            <Typography variant="h6" className={classes.menuTitle}>
              Trello
            </Typography>
          </IconButton>
         
            <div className={classes.boardsContainer}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
