const initState = {
    profile: null
};

const profileReducer = (state = initState ,action)=>{
    switch (action.type) {
        case "PROFILE_UPDATE_SUCCESS":
            return {
                ...state,
                profile: null
            };
        case "PROFILE_UPDATE_FAIL":
            return {
                ...state,
                error: "ERROR"
            };
        case "PROFILE_DATA_SUCCESS":
            return {
                ...state,
                profile:action.user
            };
        case "PROFILE_DATA_FAIL":
            return {
                ...state,
                profile: null
            };
        case "firstName":
            console.log(state.profile);
            return {
                ...state,
                profile:{
                    ...state.profile,
                    firstName:action.value
                }
            };
        case "lastName":
            console.log(state.profile);
            return {
                ...state,
                profile:{
                    ...state.profile,
                    lastName:action.value
                }
            };
        case "username":
            return {
                ...state,
                profile:{
                    ...state.profile,
                    username:action.value
                }
            };
        case "password":
            return {
                ...state,
                profile:{
                    ...state.profile,
                    password:action.value
                }
            };
        case "confirmPassword":
            return {
                ...state,
                profile:{
                    ...state.profile,
                    confirmPassword:action.value
                }
            };
        case "email":
            return {
                ...state,
                profile:{
                    ...state.profile,
                    email:action.value
                }
            };
        case "image":
            console.log(action.value);
            return {
                ...state,
                profile:{
                    ...state.profile,
                    image:action.value
                }
            };
        default:
            return state;
    }
};

export default profileReducer;