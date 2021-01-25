import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import userReducer from './userReducer'
import projectReducer from "./projectReducer"

export default combineReducers({
    users : userReducer,
    tasks : taskReducer,
    projects : projectReducer
})