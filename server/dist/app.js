"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./types/user");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const cors_1 = __importDefault(require("cors"));
let app = express_1.default();
let http = http_1.createServer(app);
exports.http = http;
let io = socket_io_1.default(http);
exports.io = io;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
const auth_1 = require("./route/auth");
app.use("/auth", auth_1.router);
const user_2 = require("./route/user");
app.use("/user", user_2.router);
const session_1 = require("./route/session");
app.use("/session", session_1.router);
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: "open-colab",
    entities: [user_1.User],
    synchronize: true
}).then(() => {
    http.listen(process.env.PORT || 4213, () => {
        console.log('Server Started!...');
    });
}).catch(err => console.log(err));
//# sourceMappingURL=app.js.map