import authReducer from "./authReducer";
import sessionReducer from "./sessionReducer";
import {combineReducers} from "redux";
import profileReducer from "./profileReducer";
import formReducer from "./formReducer";
import socketReducer from "./socketReducer";

const combinedReducers = combineReducers({
    auth: authReducer,
    sessionStorage: sessionReducer,
    profile: profileReducer,
    forms: formReducer,
    socket: socketReducer
});

export default combinedReducers;