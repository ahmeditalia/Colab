import axios from "axios";

export const createSession = (sessionInfo,callback)=>{
    return (dispatch)=>{
        axios.post("/createSession",{session: sessionInfo})
            .then((res)=>dispatch({type: "CREATION_SUCCESS",session: res.data.session}))
            .then(()=> callback())
            .catch((err)=> dispatch({type: "CREATION_FAIL"}));
    };

};