import axios from "axios";

export const getProfile = (callback)=>{
    return (dispatch)=>{
        axios.post("/getUserProfile")
            .then((res)=> dispatch({type: "PROFILE_DATA_SUCCESS", user: res.data.user}))
            .then(()=> callback())
            .catch((err)=> dispatch({type: "PROFILE_DATA_FAIL"}))
    }
};