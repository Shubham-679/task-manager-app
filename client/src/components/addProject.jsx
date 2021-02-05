import { Redirect,Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Input from "./input"
import { Button, Modal }  from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addProject,
  getProjects,
  removeProject,
} from "../actions/projectAction";

const initialValues = {
    title : "",
    description: ""
  };

const token = localStorage.getItem("x-auth-token");

const AddProject = (props) => {

  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors , setErrors] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects(token));
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const err = errors
    const { name, value } = e.currentTarget;
    const errorMessages = validateProperty(name, value);
    if (errorMessages) err[name] = errorMessages;
    else delete err[name];
    setErrors(errors=> err || {})
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validateProperty = (name, value) => {
    if(name === "title"){
        if(value.trim() === '') return 'Title Is Required'
    }
    if(name === "description"){
        if(value.trim() === '') return 'Description Is Required'
    }
};

  const validate = () => {
    const errors= {}
     if(values.title.trim() === "")
       errors.title = "Title is required"
     if(values.description.trim() === "")
       errors.description = " Description is required"
     return Object.keys(errors).length === 0 ? null : errors;
  
 };
 

  const handleSubmit =  (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(errors => er || {});
    if (er) return
    dispatch(addProject(values))
  };

  const handleRemove = async (project) => {
    dispatch(removeProject(project._id, token));
  };

  return (
    <React.Fragment>

      {!token && !props.users.isAdmin && (
        <React.Fragment>
          <Redirect to="/not-found" />
        </React.Fragment>
      )}

      {token && props.users.isAdmin &&(
        <React.Fragment>

          <div className="container mt-4">
            <h1> Welcome </h1>
            <h5> Now You Can Manage Your Project and Tasks... Here </h5>
          <Button className=" btn btn-lg mt-3" variant="primary" onClick={handleShow}>New Project</Button>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <Input
              value={values.title}
              onChange={handleInputChange}
              name="title"
              type="text"
              placeholder="Title"
              className="form-control"
              error ={errors.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Description</label>
            <Input
              value={values.description}
              onChange={handleInputChange}
              name="description"
              type="text"
              placeholder="Description"
              className="form-control"
              error ={errors.description}
              />
          </div>
          <div className="mb-3">
            <Button variant="primary" type="submit" onClick={handleClose}>Submit</Button>
          </div>
        </form>
            </Modal.Body>
          </Modal>

          <div className="mt-5">
            <ul className="container">
                {props.projects.map(project => (
                    <li className="list-group-item" 
                    key={project._id}
                    > <div className="row">
                      <div className="col-5 text-left">
                        <h4>{project.title} </h4>
                      </div>
                      <div className="col-5 text-left">
                        <p>Description : {project.description} </p>
                      </div>
                      <div className="col-1">
                        <Link to={`/project/${project._id}`}><i class="fa fa-eye"></i></Link>
                      </div>
                        <div className="col-1">
                        <i className="fa fa-trash" aria-hidden="true" 
                        onClick={() => handleRemove(project)} 
                        style={{ cursor: "pointer"}}></i>
                        </div>
                    </div>
                    </li>
                ))}
            </ul>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
  projects: state.projects,
});

export default connect(mapStateToProps)(AddProject);
