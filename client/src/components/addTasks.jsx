import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {  getUserTasks, toggleTask} from "../actions/taskAction";



const token = localStorage.getItem("x-auth-token");
const Tasks = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = props.users.user._id
    dispatch(getUserTasks(userId));
  }, [dispatch]);
  
  console.log(props.tasks)
  

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
                <div className="list-group-item col-sm-10 card text-white bg-secondary mb-3 m-2" key={task._id}>
                <h5 className="card-title">Project : {task.project.title}</h5>
                <div className="card-header">Task : {task.description}</div>
                 </div>
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