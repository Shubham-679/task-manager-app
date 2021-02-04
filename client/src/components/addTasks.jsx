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
  }, [dispatch, props.users.user._id]);

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
              <div className="row">
              {props.tasks.map((task) => (
                <div className="col-6 social-icons" key={task._id}>
                <Link to={`/tasks/${task._id}`}  style={{textDecoration: 'none'}}>
                <div className="list-group-item col-sm-5 card text-white bg-dark m-2" 
                style={{maxWidth: '58rem'}}>
                <div className="card-header">Task : {task.description}</div>
                <h5 className="card-title">Project : {task.project.title}</h5>
                 </div>
                </Link>
                </div>
              ))}
              </div>
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