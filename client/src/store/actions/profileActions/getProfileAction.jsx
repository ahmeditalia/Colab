import axios from "axios";
import {IMAGE, PROFILE_RETRIEVAL_ERROR, PROFILE_RETRIEVED, USERNAME} from "../../dataMapping/user";
import {GET_PROFILE_INFO, GET_PROFILE_PIC} from "../../dataMapping/serverURLs";



export const getProfile = ()=>{
    return (dispatch)=>{
        axios.get(GET_PROFILE_INFO + localStorage.getItem(USERNAME))
            .then((res)=> {
                const user = {
                    ...res.data.user,
                    [IMAGE]:{
                        URL: GET_PROFILE_PIC + localStorage.getItem(USERNAME)
                    }
                };
                dispatch({type: PROFILE_RETRIEVED, payload: user});
            })
            .catch((error) =>
                dispatch({type: PROFILE_RETRIEVAL_ERROR, payload: error.response.data.auth}))
    }
};