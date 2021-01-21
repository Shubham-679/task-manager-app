import React, { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { addTask,getTasks, updateTask,removeTask ,toggleTask} from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Tasks = (props) => {
  // const b = tasks.map(a => a.completed)
  // console.log( typeof b)
  // const [ status,  setStatus ] = useState(b)

  // const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // let token = localStorage.getItem("x-auth-token");
  //     if(token === null){
  //       localStorage.setItem("x-auth-token", "");
  //       token = "";
  //     }
 
  useEffect(() => {
    dispatch(getTasks(props.users.token));
  }, [dispatch ,props.users.token]);

  let input = React.createRef();
  const handleOnsubmit = (e) => {
    e.preventDefault();
    const task = input.current.value;
    dispatch(addTask(task, props.users.token));
  };

  let value;
  const handleChange = (e) => {
    value = e.target.value;
  };
  const handleUpdate = (task) => {
    task.description = value;
    dispatch(updateTask(task, props.users.token));
  };

  const handleRemove = async (task) => {
    dispatch(removeTask(task._id, props.users.token));
  };

  return (
    <div className="container">
      {!props.users.token && (
        <React.Fragment>
          <Redirect to="/not-found" />
        </React.Fragment>
      )}

      {props.users.token && (
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
