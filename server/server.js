var express = require('express');
var app = express();
const path = require('path')
var bodyParser = require('body-parser');
const cors = require("cors")
const client = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID 
var assert = require('assert');
var test
// server.listen(http,PORT)

var http = require('http').Server(app);
var server = http.listen(3000, function(){
   console.log('Server listening on port: 3000')
});

app.use(bodyParser.json());
app.use(cors())

app.use(express.static(path.join(__dirname,'../dist/chat-app')));
console.log(__dirname)
app.get('/', function(req,res){
    // res.sendFile(__dirname,'../dist/chat-app');
    res.sendFile(__dirname,'../dist/chat-app');
});

//socket.io
const sockets = require("./Socket.js")
const PORT = 3000
const io = require('socket.io')(http,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
sockets.connect(io,PORT)




 // Database Code
 const url = "mongodb://127.0.0.1:27017"
 client.connect(url, {useNewUrlParser: true, useUnifiedTopology:true}, function(err,client){
    if (err){
      return console.log(err)
    }
const dbName = "chatdb"
const db = client.db(dbName)
console.log("connected to chatdb")
require('./route/loginValidate')(db,app);
require('./route/validUser')(db,app);
require('./route/newUser')(db,app);
require('./route/newUserProfile')(db,app);
require('./route/updateProfilePic')(db,app);
require('./route/getMessageHistory')(db,app);
require('./route/updateMessageHistory')(db,app);
// require('./route/getGroups')(db,app);
require('./route/getAllGroups')(db,app);
require('./route/getMessageHistory')(db,app);
require('./route/addGroup')(db,app);
require('./route/deleteGroup')(db,app);
require('./route/getchatUserChannels')(db,app);
require('./route/getAllUsers')(db,app);
require('./route/deleteUser')(db,app);
// require('./route/updateGroup')(db,app);
});

//image upload code
const formidable = require('formidable')
var fs = require("fs")
app.use('/images', express.static(path.join(__dirname, './profileImages')));
require('./route/imageUpload')(app, formidable, fs, path)

module.exports = app;