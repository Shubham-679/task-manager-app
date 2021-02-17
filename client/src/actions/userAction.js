import axios from "axios";

export const addUser = (values) => async (dispatch) => {
  const { data: newUser } = await axios.post("/users",values);
  dispatch({
    type: "ADD_USER",
    payload: newUser,
  });
};

export const findUser = (values) => async (dispatch) => {
  const { data: user } = await axios.post("/users/login",values);
  dispatch({
    type: "FIND_USER",
    payload: user,
  });
  return user;
};

export const logoutUser = (token) => async (dispatch) => {
  const { data: user } = await axios.get("/users/logout", {
    headers: {"x-auth-token": token},
  });
  dispatch({
    type: "LOGOUT_USER",
    payload: user,
  });
};

export const updateUser = (values, token) => async (dispatch) => {
  const { data: user } = await axios.patch("/users/me",values,
    {headers: {"x-auth-token": token},
    });
  dispatch({
    type: "UPDATE_USER",
    payload: user,
  });
};

export const getUser = (token) => async (dispatch) => {
  const { data: users } = await axios.get("/users",{
    headers: {"x-auth-token": token},
  });
  dispatch({
    type: "GET_USER",
    payload: users,
  });
  return users;
};


export const addProfileImg = (data , token) => async (dispatch) => {
    const {data : newPhoto} = await axios.put("/users/me/profileImg", data , {
      headers: {
        "x-auth-token": token,
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch({
      type: 'ADD_PHOTO',
      payload : newPhoto
    });
    return newPhoto
  };
  
  export const removeUser = (token) => async (dispatch) => {
    const user = await axios.delete("/users/me", {
      headers: {
        "x-auth-token": token
      },
    });
    dispatch({
      type: "REMOVE_USER",
      payload: user,
    });
    return user;
  };