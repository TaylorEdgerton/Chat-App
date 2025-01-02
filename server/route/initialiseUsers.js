const Client = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017"
const dbName = 'chatdb';
const colName = "users"
// const client = new MongoClient(url)

const client = new Client(url)


async function run(){
  const db = client.db(dbName)
  db.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection Created")
  })

  const data1 = {username: "Admin", pwd: "Admin",
    email: "test@test.com.au", profilePic: "default.png", role:"SuperAdmin", groups:[]}

  db.collection(colName).insertOne(data1, function(err, res) {
    if (err) throw err;
    console.log("data1 created");
  });

  const data2 = {username: "User", pwd: "User",
    email: "User@test.com.au", profilePic: "default.png", role:"User", groups:[]}


    db.collection(colName).insertOne(data2, function(err, res) {
      if (err) throw err;
      console.log("data2 created");
    });
  // db.collection(colName).insertOne(data2, function(err, res) {
  //   if (err) throw err;
  //   console.log("data2 created");
  // });

  // db.collection(colName).insertOne(data3, function(err, res) {
  //   if (err) throw err;
  //   console.log("data3 created");
  // });

}
run().catch(console.dir)