import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { getTaskById, updateTask, removeTask } from "../actions/taskAction";
import { Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { getUser } from "../actions/userAction";


const token = localStorage.getItem("x-auth-token");
const UpdateTask = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const taskId = props.match.params.id;
    dispatch(getUser(token)).then((res) => setUser(res));
    dispatch(getTaskById(taskId, token));
  }, [dispatch, props.match.params.id]);

  const [show, setShow] = useState(false);
  const [values, setValues] = useState({task:"",user:""});
  const [users, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(moment().toDate()) 
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validateProperty = (name, value) => {
    if (name === "task") {
      if (value.trim() === "") return "Task Is Required";
    }
    if (name === "user") {
      if (value.trim() === "") return "User Is Required";
    }
  };
  const validate = () => {
    const errors = {};
    if (values.task.trim() === "") errors.task = "Task is required";
    if (values.user.trim() === "") errors.user = "User is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleInputChange = (e) => {
    const err = errors;
    const { name, value } = e.currentTarget;
    const errorMessages = validateProperty(name, value);
    if (errorMessages) err[name] = errorMessages;
    else delete err[name];
    setErrors((errors) => err || {});
    setValues({
      ...values,
      [name]: value,
    });
  };

  const isWeekday = date => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  const handleDateInput = (date) => {
    if(!date) return 
    setDate(date)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors((errors) => er || {});
    if (er) return;
    const formattedDate = moment(date).format('ll')
    const valuesWithDate = { ...values, formattedDate}
    console.log(valuesWithDate)
    dispatch(updateTask(valuesWithDate,token, props.match.params.id));
    setValues({task:'', user:''})
    handleClose()
  };
  const handleRemove =  (task) => {
    dispatch(removeTask(task._id, token));
    props.history.replace('/addproject')
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
              <form>
                <div className="mb-3">
                  <label htmlFor="task" className="form-label">
                    Task
                  </label>
                  <textarea
                    value={values.task}
                    onChange={handleInputChange}
                    name="task"
                    type="text"
                    placeholder="Task"
                    className="form-control"
                  />
                  {errors.task && (
                    <small className="text-danger">{errors.task}</small>
                  )}
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
                  <div>
                  {errors.user && (
                    <small className="text-danger">{errors.user}</small>
                  )}
                </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Date">Deadline Date</label>
                    <br></br>
                    <DatePicker
                      selected={date}
                      onChange={handleDateInput}
                      name="date"
                      id="date"
                      label="Date"
                      minDate={new Date()}
                      filterDate={isWeekday}
                    />
                  </div>
                <div className="mb-3">
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          <div className="container-fluid mt-5">
            <ul className="list-group">
              {props.tasks.map((task) => (
                <li className="list-group-item" key={task._id}>
                  <div className="row">
                    <h5 className="col-4 text-left">{task.description}</h5>
                    <p className="col-2">User : {task.owner.name}</p>
                    <p className="col-2">Status : {task.status}</p>
                    <p className="col-2">Deadline : {task.deadline}</p>
                    <div className="col-1 text-right">
                      <i className="fa fa-pencil-square-o" aria-hidden="true"
                       onClick={handleShow}
                      style={{ cursor: "pointer"}}></i>
                    </div>
                    <div className=" col-1 text-right">
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
