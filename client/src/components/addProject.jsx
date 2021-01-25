import { Redirect,Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Button, Modal }  from "react-bootstrap"
import {
  addProject,
  getProjects,
  updateProject,
  removeProject,
} from "../actions";

const initialValues = {
    title : "",
    description: ""
  };

const token = localStorage.getItem("x-auth-token");

const AddProject = (props) => {

  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getProjects(token));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log(values)
    dispatch(addProject(values))  
  };

  const handleRemove = async (project) => {
    dispatch(removeProject(project._id, token));
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
          <Button variant="primary" onClick={handleShow}>
            New Project
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              value={values.title}
              onChange={handleInputChange}
              name="title"
              type="text"
              placeholder="Title"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Description</label>
            <input
              value={values.description}
              onChange={handleInputChange}
              name="description"
              type="text"
              placeholder="Description"
              className="form-control"/>
          </div>
          <div className="mb-3">
              <Button variant="primary" type="submit" onClick={handleClose}>
                Submit
              </Button>
          </div>
        </form>
            </Modal.Body>
          </Modal>

          <div className="container col-4 mt-5">
            <ul className="list-group">
                {props.projects.map(project => (
                    <li className="list-group-item" 
                    key={project._id}
                    >
                      <div className="float-left">
                        <Link to={`/project/${project._id}`}>View</Link>
                        <p>Title : {project.title} </p>
                        <p>Description : {project.description} </p>
                        </div>
                        <div className="text-right">
                        <i className="fa fa-trash" aria-hidden="true" 
                        onClick={() => handleRemove(project)} 
                        style={{ cursor: "pointer"}}></i>
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
  projects: state.projects,
});

export default connect(mapStateToProps)(AddProject);
