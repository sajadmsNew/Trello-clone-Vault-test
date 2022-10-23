import React, { useState } from "react";
// import { UserContext } from "";
// import { ListHelpers } from "helpers";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { IconButton, Grid, Typography } from "@material-ui/core";
import { AddTaskModal, TaskColumn, ListMenu, RenameMenu } from "../index";
import { Add, MoreHoriz } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { listStyles } from "./styles";

const List =(props)=> {
   const [state,setState]=useState({ addCardAnchorEl: null,  listMenuAnchorEl: null, renameMenuAnchorEl: null, });
  const  listContainerRef = React.createRef();
  

 const handleNameInputClose = () => {
    setState({
      addCardAnchorEl: null,
    });
  };

 const handleListMenuClose = () => {
    setState({
      listMenuAnchorEl: null,
    });
  };

 const handleRenameMenuClose = () => {
    setState({
      renameMenuAnchorEl: null,
    });
  };

const  handleAddAnotherCardButtonClick = (event) => {
    setState({
      addCardAnchorEl: event.currentTarget,
    });
  };

const  handleListMenuButtonClick = (event) => {
    setState({
      listMenuAnchorEl: event.currentTarget,
    });
  };

const  handleRenameButtonClick = () => {
    setState({
      renameMenuAnchorEl: listContainerRef.current,
    });
  };

 const handleDeleteButtonClick = () => {
    // let { renderedBoard, setRenderedBoard } = this.context;
    // if (renderedBoard && renderedBoard.lists) {
    //   let newState = { ...renderedBoard };
    //   delete newState.lists[this.props.list.id];
    // }
  };

    const { classes, createNewTask, list, index } = props;
    return (
      <Draggable draggableId={list.id} index={index}>
        {(provided, snapshot) => (
          <div {...provided.draggableProps} ref={provided.innerRef}>
            <div
              className={classes.container}
              style={{ transform: snapshot.isDragging && "rotate(3.5deg)" }}
            >
              <Grid
                container
                {...provided.dragHandleProps}
                ref={listContainerRef}
              >
                <Grid item container xs={9} className={classes.title}>
                  {props.list.title}
                </Grid>
                <Grid item container xs={3} justify="flex-end">
                  <IconButton
                    onClick={handleListMenuButtonClick}
                    style={{ padding: "8px" }}
                  >
                    <MoreHoriz />
                  </IconButton>
                </Grid>
                <ListMenu
                  anchorEl={state.listMenuAnchorEl}
                  handleClose={handleListMenuClose}
                  renameButtonClick={handleRenameButtonClick}
                  deleteButtonClick={handleDeleteButtonClick}
                  listId={props.list.id}
                />
                <RenameMenu
                  anchorEl={state.renameMenuAnchorEl}
                  handleClose={handleRenameMenuClose}
                  listTitle={props.list.title}
                  listId={props.list.id}
                />
              </Grid>
              <Droppable droppableId={list.id} type="task">
                {(provided, snapshot) => (
                  <div
                    className={
                      snapshot.isDraggingOver
                        ? classes.dragging
                        : classes.taskList
                    }
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TaskColumn list={list} tasks={props.tasks} />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className={classes.title}>
                <Grid container justify="space-between" alignItems="center">
                  <IconButton
                    className={classes.addAnotherCard}
                    aria-label="cover"
                    onClick={(e) => {
                      handleAddAnotherCardButtonClick(e);
                    }}
                  >
                    <Grid item xs={10}>
                      <Typography className={classes.buttonText} component="p">
                        Add  card
                      </Typography>
                    </Grid>
                    <Grid item container xs={2}>
                      <Add className={classes.menuIcon} />
                    </Grid>
                  </IconButton>
                  <AddTaskModal
                    anchorEl={state.addCardAnchorEl}
                    handleClose={handleNameInputClose}
                    createNewTask={createNewTask}
                    list={list}
                  />
                </Grid>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
}

export default withStyles(listStyles)(List);
