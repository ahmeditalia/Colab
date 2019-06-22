import {
    ADD_CASE,
    ADD_TASK,
    CASES,
    SESSION_CREATION_FORM,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    TASK_FORM, TASK_HINTSFIELD,
    TASK_INPUTFIELD, TASK_OUTPUTFIELD, TASK_WEIGHTFIELD
} from "../dataMapping/form";

const initState = {
    [SIGN_IN_FORM]: false,
    [SIGN_UP_FORM]: false,
    [SESSION_CREATION_FORM]: false,
    [TASK_FORM]: false,
    [CASES]:[]
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
        case SESSION_CREATION_FORM:
            return {
                ...state,
                [SESSION_CREATION_FORM]: action.payload
            };
         case TASK_FORM:
            return {
                ...state,
                [TASK_FORM]: action.payload
            };
        case ADD_CASE:
            state[CASES].push({input:'',output:'',weight:'',hints:''});
            return state;
        case TASK_INPUTFIELD:
                state[CASES][action.payload.index][TASK_INPUTFIELD] = action.payload.value;
                console.log('input');
                console.log(state[CASES]);
            return state;
        case TASK_OUTPUTFIELD:
            state[CASES][action.payload.index][TASK_OUTPUTFIELD] = action.payload.value;
            console.log('output');
            console.log(state[CASES]);
            return state;
        case TASK_HINTSFIELD:
            state[CASES][action.payload.index][TASK_HINTSFIELD] = action.payload.value;
            console.log('hints');
            console.log(state[CASES]);
            return state;
        case TASK_WEIGHTFIELD:
            state[CASES][action.payload.index][TASK_WEIGHTFIELD] = action.payload.value;
            console.log('weight');
            console.log(state[CASES]);
            return state;
        default:
            return state;
    }
};

export default formReducer;