const initState ={
    openedSession: null,
    sessions: []
};

const sessionReducer = (state = initState , action)=>{
    switch (action.type) {
        case "CREATION_SUCCESS":
            return {
                ...state,
                openedSession: action.session
            };
        case "CREATION_FAIL":
            return {
                ...state,
                sessionError: "Creation Failed"
            };
        case "SESSIONS_RETRIEVAL_SUCCESS":
            return {
                ...state,
                sessions: action.sessions
            };
        case "SESSIONS_RETRIEVAL_FAILED":
            return {
                ...state,
                sessions: null
            };
        default:
            return state;
    }
};

export default sessionReducer;