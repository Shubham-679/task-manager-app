import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getUser } from "../actions/userAction";
import { findProject, updateProject } from "../actions/projectAction";
import { addTask, getTasks } from "../actions/taskAction";
import Input from "./input";
import UserTable from "./userTable";
import SearchBox from "./searchBox";

const token = localStorage.getItem("x-auth-token");
const Project = (props) => {

  const dispatch = useDispatch();
  const [projectValues, setProjectValues] = useState([{}]);
  const [values, setValues] = useState({ task: '', user: ''});
  const [users, setUser] = useState([]);
  const [tasks, setTask] = useState([]);
  const [errors, setErrors] = useState({});
  const [sortColumn, setSortColumn] = useState({ path: '', order: '' });
  const [searchQuery, setSearchQuery] = useState('')
  const [date, setDate] = useState(moment().toDate())  
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useLayoutEffect(() => {
    const projectId = props.match.params.id;
    dispatch(findProject(projectId, token)).then((res) => setProjectValues(res));
    dispatch(getUser(token)).then((res) => setUser(res));
    dispatch(getTasks(projectId, token)).then((res) => setTask(res));
  }, [dispatch, props.match.params.id])

  useEffect(() => {
    if (searchQuery !== "") {
      let filtered = props.tasks.filter((m) =>
        m.description.toLowerCase().includes(searchQuery.toLowerCase()));
      setTask(filtered)
    }
    if (searchQuery === "") setTask(props.tasks)
  }, [searchQuery]);

  const validateProperty = (name, value) => {
    if (name === "title") {
      if (value.trim() === "") return "Title Is Required";
    }
    if (name === "description") {
      if (value.trim() === "") return "Description Is Required";
    }
  };
  const validatePropertyTask = (name, value) => {
    if (name === "task") {
      if (value.trim() === "") return "Task Is Required";
    }
    if (name === "user") {
      if (value.trim() === "") return "User Is Required";
    }
  };

  const validate = () => {
    const errors = {};
    if (projectValues.title.trim() === "") errors.title = "Title is required";
    if (projectValues.description.trim() === "") errors.description = "Description is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };
  const validateTask = () => {
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
    setProjectValues({
      ...projectValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors((errors) => er || {});
    if (er) return;
    dispatch(updateProject(projectValues, token)).then((res) => {
      setProjectValues((projectValues) => res);
    });
    handleClose()
  };

  const handleInputChangeTask = (e) => {
    const err = errors;
    const { name, value } = e.currentTarget;
    const errorMessages = validatePropertyTask(name, value);
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

  const handleSubmitTask = (e) => {
    e.preventDefault();
    const er = validateTask();
    setErrors((errors) => er || {});
    if (er) return;
    const projectId = props.match.params.id;
    const formattedDate = moment(date).format('ll')
    const valuesWithDate = { ...values, formattedDate}
    dispatch(addTask(valuesWithDate, projectId, token)).then((res) => {
      setTask((tasks) => [res, ...tasks]);
    });
    setValues({ task: '', user: '' })
    handleClose1()
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn)
    const sorted = _.orderBy(tasks, [sortColumn.path], [sortColumn.order])
    setTask(sorted);
  }

  const handleSearch = (e) => {
    setSearchQuery(e.currentTarget.value)
  };

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
            className="col-sm-10 card text-white bg-dark mb-3 mt-4 "
            style={{ marginLeft: "100px" }}
          >
            <h1 className="card-header">Title : {projectValues.title}</h1>
            <h5 className="card-title mt-2">
              Description : {projectValues.description}
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
                <Modal.Title>Update Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="mb-3">
                    <label htmlFor="Title" className="form-label">
                      Title
                    </label>
                    <Input
                      value={projectValues.title}
                      onChange={handleInputChange}
                      name="title"
                      type="text"
                      placeholder="Title"
                      className="form-control"
                      error={errors.title}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="Description" className="form-label">
                      Description
                    </label>
                    <textarea
                      value={projectValues.description}
                      onChange={handleInputChange}
                      name="description"
                      type="text"
                      placeholder="Description"
                      className="form-control"
                    />
                    <div>
                      {errors.description && (
                        <small className="text-danger">{errors.description}</small>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
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
                <form>
                  <div className="mb-3">
                    <label htmlFor="Task" className="form-label">
                      Task
                    </label>
                    <textarea
                      value={values.task}
                      onChange={handleInputChangeTask}
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
                    <label htmlFor="User" className="form-label">
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
                  <div>
                      {errors.date && (
                        <small className="text-danger">{errors.date}</small>
                      )}
                    </div>
                  <div className="mb-3">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmitTask}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
          <div className="container">
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <UserTable
              tasks={tasks}
              onSort={handleSort}
              sortColumn={sortColumn}
            />
            <div className="row social-icons" style={{ marginLeft: "100px" }}>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  tasks: state.tasks
});

export default withRouter(connect(mapStateToProps)(Project));
