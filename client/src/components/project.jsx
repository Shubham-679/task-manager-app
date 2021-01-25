import React, { useLayoutEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { findProject, getUser, updateProject } from '../actions/index'
import {withRouter} from 'react-router-dom';
import { Button, Modal }  from "react-bootstrap"


const Project = (props) => {

    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [values, setValues] = useState({});
    const [users, setUser] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useLayoutEffect(()=>{
        const projectId = props.match.params.id;
        dispatch(findProject(projectId))
        .then(res  => setValues(res));
        dispatch(getUser())
        .then(res  => setUser(res));
    },[dispatch])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ 
          ...values,
          [name]: value,
        });
      };
    
      const handleSubmit =  (e) => {
        e.preventDefault();
        dispatch(updateProject(values))
      };

    return ( 
        <div>
            <h2>title : {values.title}</h2>
            <h2> description : {values.description}</h2>
            <h2>task : {values.task}</h2>
            { values.user === undefined ? <p></p> : <h2>user : {values.user.name}</h2>}
            
            <Button variant="primary" onClick={handleShow}>
            Update
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
            <label htmlFor="task" className="form-label">Task</label>
            <input
              value={values.task}
              onChange={handleInputChange}
              name="task"
              type="text"
              placeholder="Task"
              className="form-control"/>
          </div>
          <div className="mb-3">
            <label htmlFor="user" className="form-label">User</label>
            <select name="user" id="user" label="User" 
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

        </div>
     );
}

const mapStateToProps = (state) => ({
    users: state.users,
  });
 
export default withRouter(connect(mapStateToProps)(Project));
