import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { addTask, getTasks, updateTask, removeTask, toggleTask} from "../actions/taskAction";


let initStatus = [
  { id: 1, name : "Processing" , value : false},
  { id: 2, name: "Done" , value : true}
]
const token = localStorage.getItem("x-auth-token");
const Tasks = (props) => {

  const dispatch = useDispatch();
  const [ status, setStatus] = useState(initStatus)
  console.log(status)
  // useEffect(() => {
  //   const taskId = props.match.params.id;
  //   console.log(taskId)
  //   dispatch(getTasks());
  // }, [dispatch]);

  let value;
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
  };
  const handleUpdate = (task) => {
    task.description = value;
    dispatch(updateTask(task, token));
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
    
          <div className="container col-12">
            <ul className="list-group">
              {props.tasks.map((task) => (
                <li className="list-group-item" key={task._id}>
                  <div className="row">
                    <div className="col-4">
                     {task.description}
                    </div>
                    <div className="col-4">
                     {task.completed}
                    </div>
                  <div className="col-4">
                    {/* <input
                      type="text"
                      id="update"
                      placeholder="Update"
                      onChange={handleChange}
                      className="m-2"
                    /> */}
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select name="status" id="status" label="Status" 
                      // value={}
                      className="form-control"
                      onChange={handleChange}
                      >
                        <option value="" />
                        {status.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                </select>
                    </div>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleUpdate(task)}
                      >Update
                    </button>
                  </div>
                  </div>
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