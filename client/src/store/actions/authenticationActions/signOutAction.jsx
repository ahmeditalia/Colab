export const signOut = ()=>{
    return (dispatch,getSatate)=> dispatch({type: "LOGOUT"});
};