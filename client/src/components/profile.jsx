import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateUser, addProfileImg } from "../actions";
import { toast } from "react-toastify";

const Profile = (props) => {
  const initialValues = {
    name: props.users.user.name,
    email: props.users.user.email,
    password: "",
    age: props.users.user.age,
  };
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(values, props.users.token))
      .then(() => {
        toast.success("Profile Updated");
      })
      .catch(() => {
        toast.error("Unexpected error");
      });
  };

  let image;
  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    image = event.target.files[0];
  };
  const onClickHandler = (event) => {
    const data = new FormData();
    data.append("img", image);
    dispatch(addProfileImg(data, props.users.token));
  };

  return (
    <div className="container mt-5">
      <div>
      {!props.users.token && (
        <React.Fragment>
          <Redirect to="/not-found" />
        </React.Fragment>
      )}
      </div>

      {props.users.token && (
        <React.Fragment>
          
        <div className="row">

            <div className="col-2">
                  <img
                    className="img-thumbnail"
                    src={props.users.user.img}
                    alt=""
                  />
            </div>
              
            <div className="col-10">
                  <h1> Name : {props.users.user.name} </h1>
                  <h1> Email : {props.users.user.email} </h1>
                  <h1> Age : {props.users.user.age} </h1>
            </div>
        
          </div>

          
           
           
          <div className="row">

              <div className="col-6">
                  <form method="post" action="#" id="#">
                    <label>Upload Your File </label>
                    <input
                      type="file"
                      name="file"
                      className="form-control"
                      onChange={onChangeHandler}
                    />
                    <button
                      type="button"
                      className="btn btn-success btn-sm m-2"
                      onClick={onClickHandler}
                    >
                      Upload
                    </button>
                  </form>
              </div>



          <div className="col-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label float-left">Name</label>
                <input
                  value={values.name}
                  onChange={handleInputChange}
                  name="name"
                  placeholder="Enter Your Name"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label className="form-label float-left">E-mail</label>
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
                <label className="form-label float-left">Password</label>
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
                <label className="form-label float-left">Age</label>
                <input
                  value={values.age}
                  onChange={handleInputChange}
                  name="age"
                  placeholder="Enter Your Age"
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary m-2" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
       
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { updateUser })(Profile);
