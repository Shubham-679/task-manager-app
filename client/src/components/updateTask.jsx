import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getTaskById, updateTask } from '../actions/taskAction';
import { Button, Modal }  from "react-bootstrap";
import { getUser} from '../actions/userAction'

const token = localStorage.getItem("x-auth-token");
const UpdateTask = (props) => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        const taskId = props.match.params.id;
        dispatch(getUser())
        .then(res  => setUser(res))
        dispatch(getTaskById(taskId))
        .then(res  => setTask(res));
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

      const handleSubmit =  (e) => {
        e.preventDefault();
        dispatch(updateTask(values, props.match.params.id))
        // .then((res) => {
        //   setTask((tasks) => [res, ...tasks]);
        // })
        // window.location.reload();
      };

    return ( 
            <div>
                <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
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
            <div className="container mt-5">
                <ul className="list-group">
                    {props.tasks.map((task) => ( 
                    <li className="list-group-item">
                        <div className="row">
                        <div className="col-4">Task : {task.description}</div>
                        <h5 className="col-4">User : {task.owner.name}</h5>
                        <Button variant="primary" onClick={handleShow}>Update</Button>
                        </div>
                    </li>
                    ))}
                </ul>
          </div>
          </div>
       
    );
}
const mapStateToProps = (state) => ({
    tasks: state.tasks,
  });
export default connect(mapStateToProps)(UpdateTask);