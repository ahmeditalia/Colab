import {SIGN_IN_FORM, SIGN_UP_FORM} from "../dataMapping/form";

const initState = {
    [SIGN_IN_FORM]: false,
    [SIGN_UP_FORM]: false
};

const formReducer = (state = initState ,action)=>{
    switch (action.type) {
        case SIGN_IN_FORM:
            return {
                ...state,
                [SIGN_IN_FORM]: action.payload
            };
        case SIGN_UP_FORM:
            return {
                ...state,
                [SIGN_UP_FORM]: action.payload
            };
        default:
            return state;
    }
};

export default formReducer;