import authReducer from "./authReducer";
import sessionReducer from "./sessionReducer";
import {combineReducers} from "redux";

const combinedReducers = combineReducers({
    auth: authReducer,
    sessionStorage: sessionReducer
});

export default combinedReducers;