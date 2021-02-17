import axios from "axios";


export const addTask = (obj, projectId, token) => async (dispatch) => {
 const obj1 ={...obj, projectId}
    const {data: newTask} = await axios.post("/tasks",obj1, {
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
    return newTask;
  };
  
  export const getTasks = (projectId, token) => async (dispatch) => {
    const {data: tasks} = await axios.get("/tasks/"+ projectId, {
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "GET_TASKS",
      payload: tasks,
    });
    return tasks;
  };
  
  export const getTaskById = (taskId, token) => async (dispatch) => {
    const {data: task} = await axios.get("/tasks/task/"+ taskId,{
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "GET_TASK_BYID",
      payload: task,
    });
    return task;
  };

  export const getUserTasks = (userId, token) => async (dispatch) => {
    const {data: tasks} = await axios.get("/tasks/users/"+ userId, {
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "GET_USER_TASKS",
      payload: tasks,
    });
    return tasks;
  };
  
  export const updateTask = (task,token, id) => async (dispatch) => {
    const {data : tasks} = await axios.put("/tasks/task/" + id, task, {
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "UPDATE_TASKS",
      payload: tasks,
    });
    return tasks
  };
  
  export const toggleTask = (task, token) => async (dispatch) => {
    await axios.patch("/tasks/" + task._id, task, {
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "TOGGLE_TASK",
      payload: task,
    });
    return task
  };


  export const removeTask = (taskId, token) => async (dispatch) => {
    const {data: tasks} = await axios.delete("/tasks/" + taskId, {
      headers: {"x-auth-token": token},
    });
    console.log(tasks)
    dispatch({
      type: "REMOVE_TASK",
      payload: tasks,
    });
  };