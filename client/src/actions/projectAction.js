import axios from "axios";

// http://localhost:3000

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