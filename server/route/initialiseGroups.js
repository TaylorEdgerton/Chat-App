const client = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017"
const dbName = 'chatdb';
const colName = "groups"
// const client = new MongoClient(url)

client.connect(url, function(err, client) {
  if (err){
    return console.log(err)
  }
  console.log("Connected successfully to Server")

  const db = client.db(dbName)
  db.createCollection("groups", function(err, res) {
    if (err) throw err;
    console.log("Collection Created")
  })

  const data1 = {groupname: "group1", usernames:["Admin", "User"], channels:[{channelNum:"1", usernames:["Admin"], messageHistory:[]}, {channelNum:"2", usernames:["Admin", "User"], messageHistory:[]}]}

  db.collection(colName).insertOne(data1, function(err, res) {
    if (err) throw err;
    console.log("data1 for groups created");
  });

  const data2 = {groupname: "group2", usernames:["Admin", "User"], channels:[{channelNum:"1", usernames:["Admin","User"], messageHistory:[]}]}

  db.collection(colName).insertOne(data2, function(err, res) {
    if (err) throw err;
    console.log("data2 for groups created");
  });

  const data3 = {groupname: "group3", usernames:["Admin", "User"], channels:[{channelNum:"1", usernames:["User"], messageHistory:[]}, {channelNum:"2", usernames:["Admin"], messageHistory:[]}]}

  db.collection(colName).insertOne(data3, function(err, res) {
    if (err) throw err;
    console.log("data3 for groups created");
  });
  // db.collection(colName).insertOne(data2, function(err, res) {
  //   if (err) throw err;
  //   console.log("data2 created");
  // });

  // db.collection(colName).insertOne(data3, function(err, res) {
  //   if (err) throw err;
  //   console.log("data3 created");
  // });

})