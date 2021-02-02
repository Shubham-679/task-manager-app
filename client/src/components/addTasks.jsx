import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {  getUserTasks } from "../actions/taskAction";



const token = localStorage.getItem("x-auth-token");
const AddTasks = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = props.users.user._id
    dispatch(getUserTasks(userId));
  }, [dispatch]);

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
            <h5> Now You Can See Your All Tasks....  Here </h5>
          </div>

          <div className="container">
            <ul className="list-group">
              {props.tasks.map((task) => (
                <Link to={`/tasks/${task._id}`}  style={{textDecoration: 'none'}} key={task._id}>
                <div className="list-group-item col-sm-5 card text-white bg-secondary mb-3 m-2">
                <div className="card-header">Task : {task.description}</div>
                <h5 className="card-title">Project : {task.project.title}</h5>
                 </div>
                </Link>
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

export default connect(mapStateToProps)(AddTasks);