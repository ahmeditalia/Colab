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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("./auth");
let router = express_1.default.Router();
exports.router = router;
let ppicStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => { cb(null, path_1.default.join(__dirname, "../../ppics/")); },
    filename: (req, file, cb) => { cb(null, req["token"].username + path_1.default.extname(file.originalname) + ".tmp"); }
});
let ppicUpload = multer_1.default({ storage: ppicStorage });
router.post("/update-profile", auth_1.requireToken, ppicUpload.single("ppic"), (req, res) => __awaiter(this, void 0, void 0, function* () {
    let userRepo = typeorm_1.getRepository(user_1.User);
    let user = yield userRepo.findOne(req["token"].username);
    if (req.body.oldHash == user.hash) {
        fs_1.default.renameSync(req.file.path, req.file.path.slice(0, -4));
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.fname) {
            user.fname = req.body.fname;
        }
        if (req.body.lname) {
            user.lname = req.body.lname;
        }
        if (req.body.hash) {
            user.hash = req.body.hash;
        }
        yield userRepo.save(user);
        res.sendStatus(200);
    }
    else {
        fs_1.default.unlinkSync(req.file.path);
        res.status(403).json({ error: "Bad Credentials" });
    }
}));
router.get("/ppic/:username", (req, res) => {
    let ppicPath = path_1.default.join(__dirname, "../../ppics/" + req.params.username + ".jpg");
    if (!fs_1.default.existsSync(ppicPath)) {
        ppicPath = path_1.default.join(__dirname, "../../ppics/default.png");
    }
    res.sendFile(ppicPath);
});
router.get("/profile/:username", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let userRepo = typeorm_1.getRepository(user_1.User);
    let user = yield userRepo.findOne(req.params.username, { select: ["username", "email", "fname", "lname"] });
    if (user) {
        res.status(200).json({ user: user });
    }
    else {
        res.status(404).json({ error: "User does not exist" });
    }
}));
//# sourceMappingURL=user.js.map