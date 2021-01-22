import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import {  findUser } from "../actions";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: ""
};

const Login = (props) => {
  
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    dispatch(findUser(values))
    .then((res)=>{    
      toast.success("Login Success");
      localStorage.setItem("x-auth-token",res.token);
      // window.location = "/#/tasks";
      // <Redirect to="/tasks"/>
      props.history.replace("/tasks");

    })
    .catch((e)=>{
      toast.error("Email or Password Are Invalid !");
      console.log(e);
    })    
  };

  return (
    <div className="container" style={{backgroundColor : '#ffcccc'}}>
      <h1 className="m-4"> Login Here..</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label float-left">Email address</label>
            <input
              value={values.email}
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
            />
            <small id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label float-left">Password</label>
            <input
              value={values.password}
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="form-control"/>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
