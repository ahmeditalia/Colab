import axios from "axios";
import {JOIN_SESSION} from "../../dataMapping/serverURLs";
import {CONNECT_TO_SESSION_SOCKET} from "../../dataMapping/socket";

export const joinSession = (id,callback)=>{
    return (dispatch)=>{
        axios.get(JOIN_SESSION + id, {headers: {'Authorization': "bearer " + localStorage.getItem('user')}})
            .then(()=> dispatch({type: CONNECT_TO_SESSION_SOCKET, payload: id}))
            .then(()=> callback())
            .catch(()=> console.log("public sessions error"))
    };

};