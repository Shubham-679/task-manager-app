import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../actions/userAction";
import { toast } from "react-toastify";
import Input from '../components/input';

const initialValues = {
  name: "",
  email: "",
  password: "",
  age: "",
};

const Signup = (props) => {
  const [errors , setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();


  const validateProperty = (name, value) => {
    if(name === "name"){
        if(value.trim() === '') return 'Name Is Required'
    }
    if(name === "email"){
      if(value.trim() === '') return 'Email Is Required'
  }
    if(name === "password"){
        if(value.trim() === '') return 'Password Is Required'
    }
    if(name === "age"){
      if(value.trim() === '') return 'Age Is Required'
  }
  };

  const validate = () => {
  const errors= {}
  if(values.name.trim() === "")
    errors.name = "Name is required"

  if(values.email.trim() === "")
    errors.email = " Email is required"

  if(values.email.trim() === "")
    errors.password = "Password is required"

  if(values.age.trim() === "")
    errors.age = " Age is required"
  return Object.keys(errors).length === 0 ? null : errors;

  };

  const handleInputChange = (e) => {
    const err = errors
    const { name, value } = e.currentTarget;
    const errorMessages = validateProperty(name, value);
    if (errorMessages) err[name] = errorMessages;
    else delete err[name];
    
    setValues({
      ...values,
      [name]: value,
    });
    setErrors(errors=> err || {})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    console.log(er)
    setErrors(errors => er || {});
    if (er) return;
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
    <div style={{backgroundColor : '' , }}>
      <h1 className="m-3"> New Registration</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Name">Name</label>
            <Input
              value={values.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Enter Your Name"
              error={errors.name}
              className="form-control"
              maxlength="25"
            />
          </div>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Email"> E-mail</label>
            <Input
              value={values.email}
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              error={errors.email}
              maxlength="30"
            />
          </div>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Password">Password</label>
            <Input
              value={values.password}
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="form-control"
              error={errors.password}
              maxlength="10"
            />
          </div>
          <div className="mb-2">
            <label className="form-label float-left" htmlFor="Age">Age</label>
            <Input
              value={values.age}
              onChange={handleInputChange}
              name="age"
              placeholder="Enter Your Age"
              className="form-control"
              error={errors.age}
              maxlength="2"
            />
          </div>
          <button className="btn btn-dark btn-lg btn-block" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
