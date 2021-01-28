import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import userReducer from './userReducer';
import projectReducer from "./projectReducer";
import adminReducer from './adminReducer';


export default combineReducers({
    users : userReducer,
    tasks : taskReducer,
    projects : projectReducer,
    admin : adminReducer
})