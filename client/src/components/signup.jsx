import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Joi from "joi-browser";
import { addUser } from "../actions/userAction";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
  age: "",
};

const Signup = (props) => {
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const schema = {
  
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()

      .required()
      .min(7)
      .max(15)
      .label("Password"),
    age: Joi.number()
      .required()
      .min(2)
      .max(2)
      .label("Age")
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(values))
    .then(()=>{
      toast.success("You Registered Succesfully, Now You Can Login");
      props.history.replace('/login')
    })
    .catch(()=> {
      toast.error("Unexpected error");
      props.history.replace('/signup')
    })

  } 

  return (
    <div style={{backgroundColor : '#ffcccc' , }}>
      <h1 className="m-4"> New Registration</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Name">Name</label>
            <input
              value={values.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Enter Your Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Email"> E-mail</label>
            <input
              value={values.email}
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Password">Password</label>
            <input
              value={values.password}
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Age">Age</label>
            <input
              value={values.age}
              onChange={handleInputChange}
              name="age"
              placeholder="Enter Your Age"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary m-2" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
