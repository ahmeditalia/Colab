import {SESSION_CONNECTED_USERS} from "../dataMapping/session";
import {MY_ROLE} from "../dataMapping/sessionUsersData";

const initState = {
    [MY_ROLE]: null,
};

const sessionData = (state = initState , action)=>{
    switch (action.type) {
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