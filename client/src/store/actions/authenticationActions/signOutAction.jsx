import {HOME_URL} from "../../dataMapping/URL";
import {} from "../../dataMapping/socket";
import {DISCONNECT_FROM_DEFAULT_SOCKET} from "../../dataMapping/socket";

export const UNAUTHENTICATED = 'unauthenticated_user';

export const signOut = (history)=>{
    return (dispatch)=>{
        localStorage.clear();
        dispatch({type: UNAUTHENTICATED});
        dispatch({type: DISCONNECT_FROM_DEFAULT_SOCKET});
        history.push(HOME_URL);
    };
};