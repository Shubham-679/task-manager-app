import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { addTask, getTasks, updateTask, removeTask, toggleTask} from "../actions";


const Tasks = (props) => {

  const dispatch = useDispatch();

  let token = localStorage.getItem("x-auth-token");
      if(token === null){
        localStorage.setItem("x-auth-token", "");
        token = "";
      }
 
  useEffect(() => {
    dispatch(getTasks(token));
  }, [dispatch ,token]);

  let input = React.createRef();
  const handleOnsubmit = (e) => {
    e.preventDefault();
    const task = input.current.value;
    dispatch(addTask(task, token));
  };

  let value;
  const handleChange = (e) => {
    value = e.target.value;
  };
  const handleUpdate = (task) => {
    task.description = value;
    dispatch(updateTask(task, token));
  };

  const handleRemove = async (task) => {
    dispatch(removeTask(task._id, token));
  };

  return (
    <div className="container">
      {!token && (
        <React.Fragment>
          <Redirect to="/not-found" />
        </React.Fragment>
      )}

      {token && (
        <React.Fragment>
          <div className="m-5">
            <h1> Welcome {props.users.user.name}..! </h1>
            <h5> Now You Can Add Your Tasks... Here </h5>
          </div>
          <form onSubmit={handleOnsubmit}>
            <input
              type="text"
              id="add"
              ref={input}
              placeholder="Add New Task..."
              className="m-2"
            />
            <button className="btn btn-primary m-2">Add</button>
          </form>

          <div className="container col-10">
            <ul className="list-group">
              {props.tasks.map((task) => (
                <li className="list-group-item" key={task._id}>
                  {task.description}

                  <div>
                    <input
                      type="text"
                      id="update"
                      placeholder="Update..."
                      onChange={handleChange}
                      className="float-right m-2"
                    />
                    <button
                      className="btn btn-warning btn-sm float-right m-2"
                      onClick={() => handleUpdate(task)}
                    >
                      Update
                    </button>
                  </div>

                  <button
                    className="btn btn-danger btn-sm float-left m-2"
                    onClick={() => handleRemove(task)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
  tasks: state.tasks,
});
const mapDispatchToProps = (dispatch) => ({
  toggleTask: (id, token) => dispatch(toggleTask(id, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);