import authReducer from "./authReducer";
import sessionReducer from "./sessionReducer";
import {combineReducers} from "redux";
import profileReducer from "./profileReducer";

const combinedReducers = combineReducers({
    auth: authReducer,
    sessionStorage: sessionReducer,
    profile: profileReducer
});

export default combinedReducers;