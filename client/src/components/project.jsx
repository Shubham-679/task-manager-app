import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { findProject, updateProject } from "../actions/projectAction";
import { addTask, getTasks } from "../actions/taskAction";
import { getUser } from "../actions/userAction";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";


const Project = (props) => {
  const dispatch = useDispatch();
  const [projectValues, setProjectValues] = useState([{}]);
  const [values, setValues] = useState({});
  const [users, setUser] = useState([]);
  const [tasks, setTask] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    const projectId = props.match.params.id;
    dispatch(findProject(projectId)).then((res) => setProjectValues(res));
    dispatch(getUser()).then((res) => setUser(res));
    dispatch(getTasks(projectId)).then((res) => setTask(res));
  }, [dispatch, props.match.params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectValues({
      ...projectValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject(projectValues)).then((res) => {
      setProjectValues((projectValues) => res);
    });
  };

  const handleInputChangeTask = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    const projectId = props.match.params.id;
    dispatch(addTask(values, projectId)).then((res) => {
      setTask((tasks) => [res, ...tasks]);
    });
    window.location.reload();
  };
  console.log(props.users.isAdmin)

  return (
    <div>
      {!props.users.isAdmin && (
        <React.Fragment>
          <Redirect to="/not-found" />
        </React.Fragment>
      )}
      {props.users.isAdmin && (
        <React.Fragment>
          <div
            className="col-sm-10 card text-white bg-secondary mb-3 mt-4 "
            style={{ marginLeft: "100px" }}
          >
            <div className="card-header">title : {projectValues.title}</div>
            <h5 className="card-title">
              description : {projectValues.description}
            </h5>
            <div>
              <Button
                className="btn m-2"
                variant="primary"
                onClick={handleShow}
              >
                Update
              </Button>
              <Button variant="primary" onClick={handleShow1}>
                Add Task
              </Button>
            </div>
          </div>
          <div className="m-2">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>New Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      value={projectValues.title}
                      onChange={handleInputChange}
                      name="title"
                      type="text"
                      placeholder="Title"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Description
                    </label>
                    <input
                      value={projectValues.description}
                      onChange={handleInputChange}
                      name="description"
                      type="text"
                      placeholder="Description"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClose}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>

          <div className="m-2">
            <Modal show={show1} onHide={handleClose1}>
              <Modal.Header closeButton>
                <Modal.Title>Assign Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmitTask}>
                  <div className="mb-3">
                    <label htmlFor="task" className="form-label">
                      Task
                    </label>
                    <input
                      value={values.task}
                      onChange={handleInputChangeTask}
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
                      onChange={handleInputChangeTask}
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
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClose1}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
          <div className="container">
            <div className="row social-icons" style={{ marginLeft: "100px" }}>
              {tasks.map((task) => (
                <div
                  className="col-sm-5 card text-white bg-dark mb-3 m-2"
                  key={task._id}
                >
                  <div className="card-header">Task : {task.description}</div>
                  <h5 className="card-title">User : {task.owner.name}</h5>
                  <Link
                    to={`/updatetask/${task._id}`}
                    className="stretched-link"
                  ></Link>
                </div>
              ))}
            </div>
          </div>
          </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default withRouter(connect(mapStateToProps)(Project));
