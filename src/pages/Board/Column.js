import React from "react";
import { Grid } from "@material-ui/core";
import { DndArea}  from "../../components";
import { listAreaStyles } from "./styles";

const ListArea = () => {
  const classes = listAreaStyles();
  return (
    <div className={classes.root}>
      <Grid
        style={{
          backgroundImage:
             `url(https://images.unsplash.com/photo-1614538863217-0f3c6ee1e0e6?ixid=MnwyMDY2MzR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MTY1MDcwODQ&ixlib=rb-1.2.1&w=1920)`,
          backgroundColor: "#F8F9FD",
        }}
        className={classes.container}
        container
      >
        <DndArea  />
      </Grid>
    </div>
  );
};

export default ListArea;
