"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
var Session = /** @class */ (function () {
    function Session(name) {
        this.Name = name;
        this.sessionUsers = new Array();
    }
    Session.prototype.addUser = function (username, socketID) {
        /*let user = this.checkUserExistence(username);
        if(user)
            return user;*/
        var user = new User_1.User(username, socketID);
        this.sessionUsers.push(user);
        return user;
    };
    Session.prototype.removeUser = function (userID) {
        this.sessionUsers = this.sessionUsers.filter(function (user) {
            return (user.socketID != userID);
        });
    };
    /*private checkUserExistence(username:string)
    {
        this.sessionUsers.forEach((user)=>{
            if(user.username === username)
                return user;
        });
        return null;
    }*/
    Session.prototype.getUserNames = function () {
        var users = [];
        this.sessionUsers.forEach(function (user) {
            users.push(user.username);
        });
        return users;
    };
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=Session.js.map