import {SESSION_CONNECTED_USERS} from "../dataMapping/session";
import {GET_PROFILE_PIC} from "../dataMapping/serverURLs";

const initState = {
    usersFields: {
        [SESSION_CONNECTED_USERS]: [],
        id: 'id',
        parentID: 'pid',
        text: 'name',
        hasChildren: 'hasChild'
    }
};

const connectedSession = (state = initState ,action)=>{
    switch (action.type) {
        case SESSION_CONNECTED_USERS:
            return {
                ...state,
                usersFields:{
                    ...state.usersFields,
                    [SESSION_CONNECTED_USERS]: action.payload
                }
            };
        default:
            return state;
    }
};

export default connectedSession;