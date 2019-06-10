let User = require("../classes/User").User;
let fs = require("fs");
let Session = require("../classes/Session").Session;
let app = require("../app").app;
let io = require("../app").io;

app.post("/signIn",(req,res)=>{
    let user = req.body.user;
    res.send({user: user});
});

app.post("/createSession",(req,res)=>{
    let session = req.body.session;
    session["id"]= 123;
    console.log(session);
    res.send({session: session});
});

app.get("/getpic",(req,res)=>{
    fs.readFile("ahmed.jpg",(err,img)=>{
        res.writeHead(200,{'Content-type':'image/jpg'});
        res.end(img);
    });
});

app.post("/getSessions",(req,res)=>{
    let sessions = [];
    if(req.body.sessionName === "all")
    {
        console.log("alllll");
        let pictures = [
            "/images/python.jpg",
            "/images/abstract-matrix.jpg",
            "/images/i_love_java_wallpaper.jpg",
            "/images/Think_Different.jpg",
            "/images/python.jpg",
            "/images/abstract-matrix.jpg",
            "/images/i_love_java_wallpaper.jpg",
            "/images/Think_Different.jpg",
        ];
        for(let i=0;i < pictures.length;i++)
        {
            sessions[i] = {
                img: pictures[i],
                title: "Title",
                description: "write your description here for this session"
            }
        }

    }
    else
    {

        console.log(req.body.sessionName);
        sessions[0] = {
            img: "/images/python.jpg",
            title: req.body.sessionName,
            description: "write your description here for this session"
        }
    }
    res.send({sessions: sessions});
});


app.post("/createSession",(req,res)=>{
    let sessionName = req.body.session;
    if(Object.keys(io.nsps).includes("/"+sessionName))
    {
        res.send({exist:true});
        return;
    }
    res.send({exist:false});
    let session = io.of(sessionName);
    console.log(Object.keys(io.nsps));
    session.sessionProperties = new Session("/"+sessionName);
    session.on("connection",function(socket){

        socket.on("newUser",(newUser,fn)=>{
            console.log(socket.id+" connecting ");
            let count = session.sessionProperties.sessionUsers.length;
            let user;
            if(!session.sessionProperties.sessionOwner) {
                user = session.sessionProperties.addUser("Master",socket.id);
                session.sessionProperties.sessionOwner = user;
            }
            else
            {
                user = session.sessionProperties.addUser("user"+count,socket.id);
                socket.join("Master");
            }
            socket.leave(user.socketID);
            socket.join(user.username);
            fn(user.username);
            session.emit("connectedClients", session.sessionProperties.getUserNames());
        });

        socket.on("disconnect",()=>{
            session.sessionProperties.removeUser(socket.id);
            console.log(socket.id+" disconnected");
            if(session.sessionProperties.sessionUsers.length === 0)
            {
            /*const connectedNameSpaceSockets = Object.keys(MyNamespace.connected); // Get Object with Connected SocketIds as properties
            connectedNameSpaceSockets.forEach(socketId => {
                session.connected[socketId].disconnect(); // Disconnect Each socket
            });*/
                session.removeAllListeners(); // Remove all Listeners for the event emitter
                delete io.nsps[session.sessionProperties.Name]; // Remove from the server namespaces
            }
            else
                session.emit("connectedClients", session.sessionProperties.getUserNames());
        });




        socket.on("joinRoom",function(room){
            socket.join(room);
            console.log(socket.id+" joined room "+ room);
        });


        socket.on("sharedCode",function(id,code){
            socket.broadcast.to(id).emit("sharedCode", id ,code);
        });
    });
});


app.post("/joinSession",(req,res)=>{
    let session = req.body.session;
    res.send({ exist:Object.keys(io.nsps).includes("/"+session)});
});