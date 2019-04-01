const bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let http = require('http').createServer(app);
let io = require('socket.io')(http);


http.listen(3001, function(){
    console.log('Server Started!...');
});

module.exports = { app, io };
require("./controllers/SocketIO");