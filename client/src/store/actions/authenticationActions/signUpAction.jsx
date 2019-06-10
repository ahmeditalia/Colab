import axios from "axios/index";

export const signUp = (signUpData,callback)=>{
    return (dispatch,getState)=>{
        axios.post("/signUp",{user: signUpData})
            .then((res)=>dispatch({type:"SIGNUP_SUCCESS" , user: res.body.user}))
            .then(()=> callback())
            .catch((err)=> dispatch({type:"SIGNUP_FAIL", error: err}))
    }
};