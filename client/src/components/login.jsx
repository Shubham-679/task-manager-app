import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { findUser } from "../actions/userAction";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Input from "../components/input"

const initialValues = {
  email: "",
  password: "",
};

const Login = (props) => {
  const [errors , setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.number()
      .required()
      .label("Password"),
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const nschema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, nschema);
    return error ? error.details[0].message : null;

        // if(name === "email"){
        //     if(value.trim() === '') return 'Email Is Required'
        // }
        // if(name === "password"){
        //     if(value.trim() === '') return 'Password Is Required'
        // }
};
const validate = () => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(values, schema, options);
  if (!error) return null;
  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
  //  const errors= {}
  //   if(values.email.trim() === "")
  //     errors.email = "Email is required"
  //   if(values.password.trim() === "")
  //     errors.password = " Password is required"
  //   return Object.keys(errors).length === 0 ? null : errors;
 
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(errors => er || {});
    if (er) {return}
    else {
    dispatch(findUser(values))
      .then((res) => {
        toast.success("Login Success");
        localStorage.setItem("x-auth-token", res.token);
        window.location = "/";
        // props.history.push('/tasks');
      })
      .catch((e) => {
        toast.error("Email or Password Are Invalid !");
        console.log(e);
      });
    }
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

  return (
    
    <div className="container">
      <h1 className="m-4"> Login Here..</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
           <Input 
           value={values.email}
           onChange={handleInputChange}
           label="Email"
           name="email"
           type="email"
           placeholder="Enter Your Email"
           error={errors.email}
           className="form-control"
           maxlength="30"
           />
            <small id="emailHelp" className="form-text mark">
              We'll never share your email with anyone else.
            </small>
          
          <div className="mb-3">
            <label htmlFor="Password" className="form-label float-left mt-2">
              Password
            </label>
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
          <div className="mb-3">
            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
