"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suser_1 = require("./suser");
class Session {
    constructor(name) {
        this.name = name;
        this.users = new Array();
    }
    addUser(username, socketId) {
        let user = new suser_1.Suser(username, socketId);
        this.users.push(user);
        return user;
    }
    removeUser(userID) {
        this.users = this.users.filter((user) => { return (user.socketId != userID); });
    }
    getUsernames() {
        let usernames = [];
        this.users.forEach((user) => { usernames.push(user.username); });
        return usernames;
    }
}
exports.Session = Session;
//# sourceMappingURL=session.js.map