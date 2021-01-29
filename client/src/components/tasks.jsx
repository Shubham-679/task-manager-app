import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { getTaskById, toggleTask} from "../actions/taskAction";

const token = localStorage.getItem("x-auth-token");
const Tasks = (props) => {
  const options = [
    { id: 1, name: "Processing", value: false },
    { id: 2, name: "Done", value: true },
  ];
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const taskId = props.match.params.id;
    dispatch(getTaskById(taskId));
  }, [dispatch]);

  const handleChange = (e) => {
    const { value } = e.target;
    const isTrueSet = value === "true";
    setStatus(isTrueSet);
  };
  const handleUpdate = (task) => {
    task.completed = status;
    dispatch(toggleTask(task, token));
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

          <div className="container">
            <ul className="list-group">
              {props.tasks.map((task) => (
                <li className="list-group-item" key={task._id}>
                  <div className="row">
                    <div className="col-1">
                      {task.completed ? (
                        <i class="fa fa-check fa-3x" aria-hidden="true"></i>
                      ) : (
                          <i class="fa fa-times fa-3x" aria-hidden="true"></i>
                        )}
                    </div>
                    <div className="col-4">{task.description}</div>
                    <div className="col-3">
                      
                        <label htmlFor="status" className="form-label">
                          Status
                        </label>
                        <select
                          name="status"
                          id="status"
                          label="Status"
                          className="form-control"
                          onChange={handleChange}
                        >
                          <option value="" />
                          {options.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                   
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleUpdate(task)}
                      >
                        Update
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

export default connect(mapStateToProps)(Tasks);
