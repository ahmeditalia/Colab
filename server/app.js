const bodyParser = require('body-parser');
let express = require('express');
let app = express();
let cors = require("cors");
let multer = require('multer');
app.use(express.static(__dirname /*+ '/public'*/));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
});

let upload = multer({ storage: storage }).single('file');

http.listen(3001, function(){
    console.log('Server Started!...');
});

module.exports = { app, io , upload };
require("./controllers/SocketIO");