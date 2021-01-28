import axios from "axios";


export const addTask = (obj, projectId) => async (dispatch) => {
 const obj1 ={...obj, projectId}
    const {data: newTask} = await axios.post("http://localhost:3000/tasks",obj1);
    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
    return newTask;
  };
  
  export const getTasks = (projectId) => async (dispatch) => {
    const {data: tasks} = await axios.get("http://localhost:3000/tasks/"+ projectId);
    dispatch({
      type: "GET_TASKS",
      payload: tasks,
    });
    return tasks;
  };

  export const getUserTasks = (userId) => async (dispatch) => {
    const {data: tasks} = await axios.get("http://localhost:3000/tasks/users/"+ userId);
    dispatch({
      type: "GET_USER_TASKS",
      payload: tasks,
    });
    return tasks;
  };
  
  export const toggleTask = (id , token) => async (dispatch) => {
    const { data: taskToggle} = await axios.put("http://localhost:3000/tasks/" + id, {
      headers: {"x-auth-token": token},
    });
    dispatch ({
        type : 'TOGGLE_TASK',
        taskToggle
    })
  }
  
  export const updateTask = (task, token) => async (dispatch) => {
    await axios.patch("http://localhost:3000/tasks/" + task._id, task, {
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "UPDATE_TASKS",
      payload: task,
    });
  };
  
  
  export const removeTask = (taskId, token) => async (dispatch) => {
    const {data: tasks} = await axios.delete("http://localhost:3000/tasks/" + taskId, {
      headers: {"x-auth-token": token},
    });
    dispatch({
      type: "REMOVE_TASK",
      payload: tasks,
    });
  };