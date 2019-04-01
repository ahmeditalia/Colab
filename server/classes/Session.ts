import {User} from "./User";

export class Session{
    Name:string;

    sessionOwner:User;

    sessionUsers:Array<User>;

    constructor(name:string)
    {
        this.Name = name;
        this.sessionUsers = new Array<User>();
    }

    addUser(username:string,socketID)
    {
        /*let user = this.checkUserExistence(username);
        if(user)
            return user;*/
        let user = new User(username,socketID);
        this.sessionUsers.push(user);
        return user;
    }

    removeUser(userID:string)
    {
        this.sessionUsers = this.sessionUsers.filter((user)=>{
            return (user.socketID != userID);
        });
    }

    /*private checkUserExistence(username:string)
    {
        this.sessionUsers.forEach((user)=>{
            if(user.username === username)
                return user;
        });
        return null;
    }*/
    getUserNames()
    {
        let users = [];
        this.sessionUsers.forEach((user)=>{
            users.push(user.username);
        });
        return users;
    }
}