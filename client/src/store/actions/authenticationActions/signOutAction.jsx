import {HOME} from "../../dataMapping/URL";
import {DISCONNECT_SOCKET} from "../../dataMapping/socket";

export const UNAUTHENTICATED = 'unauthenticated_user';

export const signOut = (history)=>{
    return (dispatch)=>{
        localStorage.clear();
        dispatch({type: UNAUTHENTICATED});
        dispatch({type: DISCONNECT_SOCKET});
        history.push(HOME);
    };
};