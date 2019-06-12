import axios from "axios";

export const updateProfile = (profile,callback)=>{
    return (dispatch)=>{
        const data = new FormData();
        data.append('file', profile.image.file);
        axios.post("/updateProfilePicture", data)
            .then((res)=>{
                profile.image = {URL: res.data.imageURL};
                axios.post("/updateProfile",{profile:profile})
                    .then(()=> callback())
                    .then(()=> dispatch({type:"PROFILE_UPDATE_SUCCESS"}))
                    .catch(()=> dispatch({type:"PROFILE_UPDATE_FAIL"}))
            });



    }
};