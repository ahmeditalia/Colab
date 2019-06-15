import {Username, Names, Password, Email} from './regexValidate';

export const FIRST_NAME = "fname";
export const LAST_NAME = "lname";
export const USERNAME = "username";
export const PASSWORD = "hash";
export const OLD_PASSWORD = "oldHash";
export const NEW_PASSWORD = "hash";
export const CONFIRM_PASSWORD = "ConfirmPassword";
export const EMAIL = "email";
export const IMAGE = "ppic";

export const validate = (type ,value)=>{
    let valid;
    if(type === FIRST_NAME){
        valid = Names.test(value);
    }
    if(type === LAST_NAME){
        valid = Names.test(value);
    }
    if(type === USERNAME){
        valid = Username.test(value);
    }
    if(type === PASSWORD){
        valid = Password.test(value);

    }if(type === EMAIL){
        valid = Email.test(value);
    }
    if(valid){
        return {type: type, msg: "Valid "+type};
    }
    return {type: type, msg: "Not valid "+type};
};

export const confirmPassword = (value1, value2)=>{
    return value1 === value2;
};