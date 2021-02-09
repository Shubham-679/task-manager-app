import { v4 as uuid } from "uuid";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import { getUserTasks, toggleTask } from "../actions/taskAction";

const token = localStorage.getItem("x-auth-token");

const Dnd = (props) => {
  const dispatch = useDispatch();

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const userId = props.users.user._id;
    dispatch(getUserTasks(userId, token)).then((res) => {
      setColumns({
        [uuid()]: {
          name: "Todo",
          items: res.filter((a) => a.status === "todo"),
        },
        [uuid()]: {
          name: "In Progress",
          items: res.filter((a) => a.status === "process"),
        },
        [uuid()]: {
          name: "Done",
          items: res.filter((a) => a.status === "done"),
        },
      });
    });
  }, []);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      if (removed.status === "process") {
        if (destColumn.name === "Done") {
          removed.status = "done";
          dispatch(toggleTask(removed, token));
        }
        if (destColumn.name === "Todo") {
          removed.status = "todo";
          dispatch(toggleTask(removed, token));
        }
      }

      if (removed.status === "done") {
        if (destColumn.name === "In Progress") {
          removed.status = "process";
          dispatch(toggleTask(removed, token));
        }
        if (destColumn.name === "Todo") {
          removed.status = "todo";
          dispatch(toggleTask(removed, token));
        }
      }
      if (removed.status === "todo") {
        if (destColumn.name === "In Progress") {
          removed.status = "process";
          dispatch(toggleTask(removed, token));
        }
        if (destColumn.name === "Done") {
          removed.status = "done";
          dispatch(toggleTask(removed, token));
        }
      }
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  console.log(columns);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      {!token && (
        <React.Fragment>
          <Redirect to="/not-found" />
        </React.Fragment>
      )}
      {token && (
        <React.Fragment>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={columnId}
                >
                  <h2>{column.name}</h2>

                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                              padding: 4,
                              width: 250,
                              minHeight: 500,
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item._id}
                                  draggableId={item._id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#2d4059",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.description}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </React.Fragment>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps)(Dnd);
