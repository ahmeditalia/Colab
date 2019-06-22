import {FONT_SIZE, THEME, INPUT_TEXT} from "../dataMapping/ace";

const initState = {
    [THEME]: "tomorrow",
    [FONT_SIZE]: "16",
    [INPUT_TEXT]: ""
};

const editorReducer = (state = initState ,action)=>{
    switch (action.type) {
        case THEME:
            return ({
                ...state,
                [THEME]: action.payload
            });
        case FONT_SIZE:
            return ({
                ...state,
                [FONT_SIZE]: action.payload
            });
        case INPUT_TEXT:
            return ({
                ...state,
                [INPUT_TEXT]: action.payload
            });
        default:
            return state;
    }
};

export default editorReducer;