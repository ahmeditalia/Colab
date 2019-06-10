import axios from "axios/index";

export const signIn = (signInData,callback)=>{
    return (dispatch,getState)=>{
        axios.post("/signIn",{user: signInData})
            .then((res)=> dispatch({type: "LOGIN_SUCCESS", user: res.data.user}))
            .then(()=> callback())
            .catch((err)=> dispatch({type: "LOGIN_FAIL", error: err}))
    };
};