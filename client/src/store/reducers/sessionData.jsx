import {MY_ROLE} from "../dataMapping/sessionUsersData";
import {SESSION_ID} from "../dataMapping/session";

const initState = {
    [SESSION_ID]: null,
    [MY_ROLE]: null,
};

const sessionData = (state = initState , action)=>{
    switch (action.type) {
        case SESSION_ID:
            return {
                ...state,
                [SESSION_ID]: action.payload
            };
        case MY_ROLE:
            return {
                ...state,
                [MY_ROLE]: action.payload
            };
        default:
            return state;
    }
};

export default sessionData;