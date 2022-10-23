import React, { useContext, useEffect } from "react";
import { Container } from "@material-ui/core";
import { UIContext } from "../../context/UIContext";
import { AppTheme } from "../../Theme";
import { boardPageStyles } from "./styles";
import Column from "./Column";

const Board = () => {
  const classes = boardPageStyles();
  const {
    setShowFooter,
  } = useContext(UIContext);

  useEffect(() => {
    setShowFooter(false);
    return () => {
      setShowFooter(true);
    };
  }, []);

  return (
    <AppTheme>
      <div className={classes.root}>
        <Container className={classes.container} component="main" maxWidth="xl">
          <Column />
        </Container>
      </div>
    </AppTheme>
  );
};

export default Board;
