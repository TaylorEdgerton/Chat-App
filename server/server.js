var express = require('express');
var Stream = require('node-rtsp-stream');
const expressWs = require('express-ws');  // Import express-ws

var app = express();
const path = require('path');
var bodyParser = require('body-parser');
const cors = require("cors");
const client = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
const { proxy, scriptUrl } = require('rtsp-relay')(app);
// Initialize express-ws by passing app as an argument
expressWs(app);  // This modifies app to support WebSocket

const handler = proxy({
  url: 'rtsp://EdgeCameras:Tre1389101!!@192.168.100.10:554/stream2',
  verbose: false,
});

app.ws('api/stream', handler);

var http = require('http').Server(app);
var server = http.listen(3000, function(){
   console.log('Server listening on port: 3000');
});

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../dist/chat-app')));
console.log(__dirname);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../dist/chat-app/index.html'));
});

// socket.io
const sockets = require("./Socket.js");
const PORT = 3000;
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});
sockets.connect(io, PORT);

//RTSP stream handling
var stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://EdgeCameras:Tre1389101!!@192.168.100.10:554/stream2',
  wsPort: 9999,
  ffmpegOptions: { // options for ffmpeg flags
    //'-r': 30,
    //'-c:v': 'mpeg1video',
    //'-s': '640x480',
    //'-b:v': '1000k',
    // '-bf': 0,
    // '-an': '',
    // '-max_delay': '1000000',
    '-q': 1
  }
});

// MongoDB
const url = "mongodb://127.0.0.1:27017";
client.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client){
  if (err) {
    return console.log(err);
  }
  const dbName = "chatdb";
  const db = client.db(dbName);
  console.log("connected to chatdb");
  require('./route/loginValidate')(db, app);
  require('./route/validUser')(db, app);
  require('./route/newUser')(db, app);
  require('./route/newUserProfile')(db, app);
  require('./route/updateProfilePic')(db, app);
  require('./route/getMessageHistory')(db, app);
  require('./route/updateMessageHistory')(db, app);
  require('./route/getAllGroups')(db, app);
  require('./route/getMessageHistory')(db, app);
  require('./route/addGroup')(db, app);
  require('./route/deleteGroup')(db, app);
  require('./route/getchatUserChannels')(db, app);
  require('./route/getAllUsers')(db, app);
  require('./route/deleteUser')(db, app);
});

// Image upload
const formidable = require('formidable');
var fs = require("fs");
app.use('/images', express.static(path.join(__dirname, './profileImages')));
require('./route/imageUpload')(app, formidable, fs, path);

module.exports = app;
