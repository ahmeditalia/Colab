import axios from "axios";
import {GET_PUBLIC_SESSIONS} from "../../dataMapping/serverURLs";
import {PUBLIC_SESSIONS_RETRIEVED} from "../../dataMapping/session";

export const getPublicSessions = ()=>{
    return (dispatch)=>{
        axios.get(GET_PUBLIC_SESSIONS)
            .then((res)=> dispatch({type:PUBLIC_SESSIONS_RETRIEVED, payload: res.data.sessions}))
            .catch(()=> console.log("public sessions error"))
    };

};