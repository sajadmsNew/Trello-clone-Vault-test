import React, { useState } from "react";
import shortid from "shortid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IconButton, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { AddColModal, ListCol } from "../index";

import { canvasStyles } from "./styles";

const DndCanvas =(props)=> {
 
  const [state, setState]=useState({anchorEl: null})

 const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    // no list to drop
    if (!destination) {
      return;
    }

    // dropping to same list same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // triggers when reordering lists
    if (type === "list") {
      const newListOrder = Array.from(state.listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const updatedState = {
        ...state,
        listOrder: newListOrder,
      };
      setState(updatedState);
     
      return;
    }

    const home = state.lists[source.droppableId];
    const foreign = state.lists[destination.droppableId];

    // triggers when reordering tasks in the same list
    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        lists: {
          ...state.lists,
          [newHome.id]: newHome,
        },
      };
      setState(newState);
      return;
    }

    // codes below only works when moving a task one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    let foreignTaskIds;
    if (foreign.taskIds) {
      foreignTaskIds = Array.from(foreign.taskIds);
    } else {
      foreignTaskIds = [];
    }
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...state,
      lists: {
        ...state.lists,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setState(newState);
  };

const  createNewList = async (title) => {
    let updatedState = { ...state };
    console.log('this is the state for creatte ing a list',updatedState)
    const listId = shortid.generate();
    let list;
    if (updatedState.lists !== undefined) {
      // board doesn't have any list
      list = {
        id: listId,
        title: title,
        taskIds: [],
      };
      updatedState.lists[listId] = list;
      updatedState.listOrder.push(listId);
      setState(updatedState);
      console.log('create a new list ',updatedState);
      window.localStorage.setItem('list',JSON.stringify({
        list: list,
        listOrder: updatedState.listOrder,
      }))
    } else {
      list = {
        id: listId,
        title: title,
        taskIds: [],
      };
      updatedState.lists = {
        [listId]: list,
      };
      updatedState.listOrder = [listId];
      console.log('create a new list if lists are empty ',updatedState);
      setState(updatedState);
      window.localStorage.setItem('list',JSON.stringify({
        list: list,
        listOrder: updatedState.listOrder,
      }))
    }
  };

 const createNewTask = (listId, title) => {
    let updatedState = { ...state };
    let taskCount;
    let taskId;
    let task;
    //  console.log('this is the task state',updatedState)
    if (updatedState.tasks !== undefined) {
      taskCount = Object.keys(updatedState.tasks).length;
      taskId = `task-${taskCount + 1}`;
      task = {
        id: taskId,
        title: title,
      };
      updatedState.tasks[taskId] = task;
      if (updatedState.lists[listId].taskIds)
        updatedState.lists[listId].taskIds.push(taskId);
      else updatedState.lists[listId].taskIds = [taskId];
      setState(updatedState);
      window.localStorage.setItem('tasks',JSON.stringify({updatedState,task}))
    } else {
      taskCount = 0;
      taskId = `task-${taskCount + 1}`;
      task = {
        id: taskId,
        title: title,
      };
      updatedState.tasks = {
        [taskId]: task,
      };
      if (updatedState.lists[listId].taskIds)
        updatedState.lists[listId].taskIds.push(taskId);
      else updatedState.lists[listId].taskIds = [taskId];
      setState(updatedState);

      window.localStorage.setItem('tasks',JSON.stringify({updatedState,task}))
    }
  };

const  handleAddAnotherListButtonClick = (event) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
    });
  };

const  handleNameInputClose = () => {
    setState({
      ...state,
      anchorEl: null,
    });
  };


    const { classes } = props;
    return ( <DragDropContext onDragEnd={onDragEnd}>
               <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              style={{ display: "flex" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state.lists && state.listOrder.map((listId, index) => {
                  console.log('this is the data on lists ',state)
                  const list = state.lists[listId];
                  if (list && list.id) {
                    return (
                      <ListCol
                        key={list.id}
                        list={list}
                        taskMap={state.tasks}
                        index={index}
                        createNewTask={createNewTask}
                      />
                    );
                  }
                })}
              {provided.placeholder}
              <div style={{ padding: "0px 8px" }}>
                <IconButton
                  onClick={(e) => handleAddAnotherListButtonClick(e)}
                  className={classes.addAnotherList}
                  aria-label="add-another-list"
                >
                  <Grid item xs={10}>
                    <Typography className={classes.buttonText} component="p">
                      Add another list
                    </Typography>
                  </Grid>
                  <Grid item container xs={2}>
                    <Add />
                  </Grid>
                </IconButton>
                <AddColModal
                  anchorEl={state.anchorEl}
                  handleClose={handleNameInputClose}
                  createNewList={createNewList}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  
}

export default withStyles(canvasStyles)(DndCanvas);
