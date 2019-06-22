import {createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger/src";

import authReducer from "./reducers/authReducer";
import sessionReducer from "./reducers/sessionReducer";
import profileReducer from "./reducers/profileReducer";
import formReducer from "./reducers/formReducer";
import socketReducer from "./reducers/socketReducer";
import sessionData from "./reducers/sessionData";
import editorReducer from "./reducers/editorReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    sessionStorage: sessionReducer,
    profile: profileReducer,
    forms: formReducer,
    sockets:  socketReducer,
    sessionData: sessionData,
    editor: editorReducer
});


export let store = createStore(rootReducer,applyMiddleware(thunk/*,createLogger()*/));