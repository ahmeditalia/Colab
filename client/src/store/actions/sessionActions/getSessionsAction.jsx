import axios from "axios";

export const getSessions = (sessionName)=>{
    return (dispatch)=>{
        axios.post("/getSessions",{sessionName: sessionName})
            .then((res)=> dispatch({type:"SESSIONS_RETRIEVAL_SUCCESS",sessions: res.data.sessions}))
            .catch((error)=> dispatch({type: "SESSIONS_RETRIEVAL_FAILED"}))
    };

};