export class User{
    username:string;
    socketID:string;
    constructor(username:string,socketID:string)
    {
        this.username=username;
        this.socketID=socketID;
    }
}