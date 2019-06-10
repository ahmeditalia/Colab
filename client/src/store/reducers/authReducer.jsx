const initState = {
    user: null
};

const authReducer = (state = initState ,action)=>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return ({
                ...state,
                user: action.user
            });
        case "LOGIN_FAIL":
            return ({
                ...state,
                user: null,
                authError: "Log in Failed"
            });
        case "SIGNUP_SUCCESS":
            return ({
                ...state,
                user: action.user
            });
        case "SIGNUP_FAIL":
            return ({
                ...state,
                user: null
            });
        case "LOGOUT":
            return ({
                ...state,
                user: null
            });
        default:
            return state;
    }
};

export default authReducer;