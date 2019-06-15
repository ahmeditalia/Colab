"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("../types/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let router = express_1.default.Router();
exports.router = router;
router.post("/sign-up", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body.user) {
        return res.status(400).json({ "error": "Missing user object" });
    }
    if (!req.body.user.username) {
        return res.status(400).json({ "error": "Missing username field" });
    }
    if (!req.body.user.email) {
        return res.status(400).json({ "error": "Missing email field" });
    }
    if (!req.body.user.hash) {
        return res.status(400).json({ "error": "Missing password field" });
    }
    let user = new user_1.User();
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.hash = req.body.user.hash;
    let userRepo = typeorm_1.getRepository(user_1.User);
    if (yield userRepo.findOne({ where: { username: req.body.user.username } })) {
        return res.status(400).json({ "error": "Username name already exists" });
    }
    if (yield userRepo.findOne({ where: { email: req.body.user.email } })) {
        return res.status(400).json({ "error": "Email name already exists" });
    }
    yield userRepo.save(user);
    let payload = { user: { username: user.username, email: user.email } };
    let token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
    res.status(200).json({ "token": token });
}));
router.post("/sign-in", (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body.user) {
        return res.status(400).json({ "error": "Missing user object" });
    }
    if (!req.body.user.username) {
        return res.status(400).json({ "error": "Missing username field" });
    }
    if (!req.body.user.hash) {
        return res.status(400).json({ "error": "Missing password field" });
    }
    let userRepo = typeorm_1.getRepository(user_1.User);
    let user = yield userRepo.findOne(req.body.user.username);
    if (user && user.hash == req.body.user.hash) {
        let payload = { user: { username: user.username, email: user.email } };
        let token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
        res.status(200).json({ "token": token });
    }
    else {
        res.status(403).json({ "error": "Bad credentials" });
    }
}));
function requireToken(req, res, next) {
    let bHeader = req.header("Authorization");
    if (bHeader) {
        jsonwebtoken_1.default.verify(bHeader.split(' ')[1], process.env.JWT_KEY, function (err, decoded) {
            if (err) {
                res.status(403).json({ "error": "Bad credentials" });
            }
            else {
                req.token = decoded.user;
                next();
            }
        });
    }
    else {
        res.status(403).json({ "error": "Bad credentials" });
    }
}
exports.requireToken = requireToken;
//# sourceMappingURL=auth.js.map