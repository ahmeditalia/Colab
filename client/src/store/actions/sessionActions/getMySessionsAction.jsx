import axios from "axios";
import {GET_MY_SESSIONS} from "../../dataMapping/serverURLs";
import {MY_SESSIONS_RETRIEVED} from "../../dataMapping/session";

export const getMySessions = ()=>{
    return (dispatch)=>{
        axios.get(GET_MY_SESSIONS , {headers: {'Authorization': "bearer " + localStorage.getItem('user')}})
            .then((res)=> dispatch({type:MY_SESSIONS_RETRIEVED, payload: res.data.sessions}))
            .catch(()=> console.log("my sessions error"))
    };

};