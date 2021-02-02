import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getTaskById, updateTask, removeTask } from "../actions/taskAction";
import { Button, Modal } from "react-bootstrap";
import { getUser } from "../actions/userAction";
import { Redirect } from "react-router-dom";

const token = localStorage.getItem("x-auth-token");
const UpdateTask = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const taskId = props.match.params.id;
    dispatch(getUser()).then((res) => setUser(res));
    dispatch(getTaskById(taskId)).then((res) => setTask(res));
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const [values, setValues] = useState({});
  const [users, setUser] = useState([]);
  const [tasks, setTask] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(values, props.match.params.id));
    // .then((res) => {
    //   setTask((tasks) => [res, ...tasks]);
    // })
    window.location.reload();
  };
  const handleRemove =  (task) => {
    dispatch(removeTask(task._id, token));
  };

  return (
    <div>
      {!token && !props.users.isAdmin && (
        <React.Fragment>
          <Redirect to="/not-found" />
        </React.Fragment>
      )}
      {token && props.users.isAdmin && (
        <React.Fragment>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="task" className="form-label">
                    Task
                  </label>
                  <input
                    value={values.task}
                    onChange={handleInputChange}
                    name="task"
                    type="text"
                    placeholder="Task"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    User
                  </label>
                  <select
                    name="user"
                    id="user"
                    label="User"
                    value={values.user}
                    className="form-control"
                    onChange={handleInputChange}
                  >
                    <option value="" />
                    {users.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <div className="container-fluid mt-5">
            <ul className="list-group">
              {props.tasks.map((task) => (
                <li className="list-group-item">
                  <div className="row">
                    <h5 className="col-3">Task : {task.description}</h5>
                    <h5 className="col-2">User : {task.owner.name}</h5>
                    <h5 className="col-2">{task.completed ? 'Done' : 'Processing'}</h5>
                    <div className="col-4 btn">
                    <Button className="btn" variant="primary" onClick={handleShow}>Update</Button>
                    </div>
                    <div className="text-right">
                        <i className="fa fa-trash" aria-hidden="true" 
                        onClick={() => handleRemove(task)} 
                        style={{ cursor: "pointer"}}></i>
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
  tasks: state.tasks,
  users : state.users
});
export default connect(mapStateToProps)(UpdateTask);
