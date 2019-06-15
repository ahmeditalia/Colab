import {HOME} from "../../dataMapping/URL";

export const UNAUTHENTICATED = 'unauthenticated_user';

export const signOut = (history)=>{
    return (dispatch)=>{
        localStorage.clear();
        dispatch({type: UNAUTHENTICATED});
        history.push(HOME);
    };
};