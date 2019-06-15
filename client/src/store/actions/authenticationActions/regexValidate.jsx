export const Username = /^[a-zA-Z0-9]+$/;
export const Names = /^[a-zA-Z ]{2,12}$/;
export const Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
export const Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;