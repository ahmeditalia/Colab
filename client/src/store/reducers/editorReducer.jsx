import {
    ACE_FONT_SIZE,
    ACE_THEME,
    ACE_INPUT_TEXT,
    ACE_OUTPUT_TEXT,
    ACE_OUTPUT_READONLY,
    EXECUTION_OUTPUT
} from "../dataMapping/ace";

const initState = {
    [ACE_THEME]: "tomorrow",
    [ACE_FONT_SIZE]: "16",
    [ACE_INPUT_TEXT]: "",
    [ACE_OUTPUT_TEXT]: "",
    [ACE_OUTPUT_READONLY]: false
};

const editorReducer = (state = initState ,action)=>{
    switch (action.type) {
        case ACE_THEME:
            return ({
                ...state,
                [ACE_THEME]: action.payload
            });
        case ACE_FONT_SIZE:
            return ({
                ...state,
                [ACE_FONT_SIZE]: action.payload
            });
        case ACE_INPUT_TEXT:
            return ({
                ...state,
                [ACE_INPUT_TEXT]: action.payload
            });
        case ACE_OUTPUT_TEXT:
            return ({
                ...state,
                [ACE_OUTPUT_TEXT]: action.payload
            });
        case ACE_OUTPUT_READONLY:
            return ({
                ...state,
                [ACE_OUTPUT_READONLY]: action.payload
            });
        case EXECUTION_OUTPUT:
            let output = "";
            action.payload.forEach((line)=>{
                output += line+"\n";
            });
            return ({
                ...state,
                [ACE_OUTPUT_TEXT]: output
            });
        default:
            return state;
    }
};

export default editorReducer;