import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import userReducer from './userReducer'

export default combineReducers({
    users : userReducer,
    tasks : taskReducer
})