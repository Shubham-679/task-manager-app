import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Joi from "joi-browser";
import { findUser } from "../actions/userAction";
import { toast } from "react-toastify";
import Input from "../components/input"

const initialValues = {
  email: "",
  password: "",
};

const Login = (props) => {
  let [errors , setErrors] = useState({ email: "",
  password: "",});
  console.log(errors.email)
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).regex(/[a-zA-Z0-9]{3,30}/).label("Password"),
  };

  const validateProperty = (name, value) => {
    const obj = {[name]: value};
    const fieldSchema = {[name]: schema[name]};
    const { error } = Joi.validate(obj, fieldSchema);
    return error ? error.details[0].message : null;
};
const validate = () => {
  const options = {
      abortEarly: false
  };
  const {error} = Joi.validate(values, schema, options);
  if (!error) return null;
  const errors = {};
  console.log(error.details)
  for (let item of error.details) errors[item.path[0]] = item.message;
  console.log(errors)
  console.log(errors.email)
  return errors;
  // result.error === null -> valid
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    console.log(errors.email)
    setErrors({errors});
    if (errors) return;

    dispatch(findUser(values))
      .then((res) => {
        toast.success("Login Success");
        localStorage.setItem("x-auth-token", res.token);
        // window.location = "/";
        // props.history.push('/tasks');
      })
      .catch((e) => {
        toast.error("Email or Password Are Invalid !");
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const errors = { ...errors}
    const { name, value } = e.currentTarget;
    const errorMessages = validateProperty(name, value);
    if (errorMessages) errors[name] = errorMessages;
    else delete errors[name];
    
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({errors})
  };
  console.log(typeof errors)
console.log(errors.email)
console.log(errors.password)
  return (
    
    <div className="container">
      <h1 className="m-4"> Login Here..</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
         
            {/* <label htmlFor="Email" className="form-label float-left">
              Email address
            </label>
            <input
              value={values.email}
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              
            /> */}
           <Input 
           value={values.email}
           onChange={handleInputChange}
           label="Email"
           name="email"
           type="email"
           placeholder="Enter Your Email"
           error={errors.email}
           className="form-control"
           />
            <small id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </small>
          
          <div className="mb-3">
            <label htmlFor="Password" className="form-label float-left">
              Password
            </label>
            <input
              value={values.password}
              onChange={handleInputChange}
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
