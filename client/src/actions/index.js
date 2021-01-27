import axios from "axios";
// 

export const addUser = (values) => async (dispatch) => {
  const {
    data: newUser
  } = await axios.post(
    'http://localhost:3000/users',
    values
  );
  dispatch({
    type: "ADD_USER",
    payload: newUser,
  });
};

export const findUser = (values) => async (dispatch) => {
  const {
    data: user
  } = await axios.post(
    "http://localhost:3000/users/login",
    values
  );
  dispatch({
    type: "FIND_USER",
    payload: user,
  });
  return user;
};

export const logoutUser = (token) => async (dispatch) => {
  const {
    data: user
  } = await axios.get("http://localhost:3000/users/logout", {
    headers: {
      "x-auth-token": token
    },
  });
  dispatch({
    type: "LOGOUT_USER",
    payload: user,
  });
};

export const updateUser = (values, token) => async (dispatch) => {
  const  { data : user } = await axios.patch("http://localhost:3000/users/me", values, {
    headers: {
      "x-auth-token": token
    },
  });
  dispatch({
    type: "UPDATE_USER",
    payload: user,
  });
};

export const getUser = () => async (dispatch) => {
  const {data: users} = await axios.get("http://localhost:3000/users", {
  });
  dispatch({
    type: "GET_USER",
    payload: users,
  });
  return users;
};


export const addTask = (obj) => async (dispatch) => {
  const {
    data: newTask
  } = await axios.post(
    "http://localhost:3000/tasks",
    obj, {
    }
  );
  dispatch({
    type: "ADD_TASK",
    payload: newTask,
  });
  console.log(newTask)
  return newTask;
};

export const getTasks = () => async (dispatch) => {
  const {data: tasks} = await axios.get("http://localhost:3000/tasks");
  dispatch({
    type: "GET_TASKS",
    payload: tasks,
  });
  return tasks;
};


export const toggleTask = (id , token) => async (dispatch) => {
  const {
    data: taskToggle
  } = await axios.put("http://localhost:3000/tasks/" + id, {
    headers: {
      "x-auth-token": token
    },
  });
  dispatch ({
      type : 'TOGGLE_TASK',
      taskToggle
  })
}

export const updateTask = (task, token) => async (dispatch) => {
  await axios.patch("http://localhost:3000/tasks/" + task._id, task, {
    headers: {
      "x-auth-token": token
    },
  });
  dispatch({
    type: "UPDATE_TASKS",
    payload: task,
  });
};


export const removeTask = (taskId, token) => async (dispatch) => {
  const {
    data: tasks
  } = await axios.delete("http://localhost:3000/tasks/" + taskId, {
    headers: {
      "x-auth-token": token
    },
  });
  dispatch({
    type: "REMOVE_TASK",
    payload: tasks,
  });
};

export const addProfileImg = (data , token) => async (dispatch) => {
  const {data : newPhoto} = await axios.put("http://localhost:3000/users/me/profileImg", data , {
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
  const user = await axios.delete("http://localhost:3000/users/me", {
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


export const addProject = (values, token) => async (dispatch) => {
  const {data: newProject} = await axios.post("http://localhost:3000/projects",values, {
      headers: {"x-auth-token": token},
    });
  dispatch({
    type: "ADD_PROJECT",
    payload: newProject,
  });
};

export const getProjects = (token) => async (dispatch) => {
  const {data: project} = await axios.get("http://localhost:3000/projects", {
    headers: {"x-auth-token": token},
  });
  dispatch({
    type: "GET_PROJECT",
    payload:  project,
  });
};


export const updateProject = (values) => async (dispatch) => {
  const { data : project} = await axios.put("http://localhost:3000/projects" , values, {
  });
  dispatch({
    type: "UPDATE_PROJECT",
    payload:  project,
  });
  return project;
};


export const removeProject = (projectId, token) => async (dispatch) => {
  const {data: projects} = await axios.delete("http://localhost:3000/projects/" + projectId, {
    headers: {"x-auth-token": token},
  });
  dispatch({
    type: "REMOVE_PROJECT",
    payload: projects,
  });
};

export const findProject = (projectId) => async (dispatch) => {
  const {data: project} = await axios.get("http://localhost:3000/projects/" + projectId, {
  });
  dispatch({
    type: "SINGLE_PROJECT",
    payload: project,
  });
  return project;
};