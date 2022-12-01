module.exports = function(db,app){
    
    app.post('/newUser', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var u = req.body;
        var p = req.body.pwd;
        var created
        const collection = db.collection('users');
        collection.find({"username":u.username}).count((err,data)=>{
            console.log(data)
            if (data == 0){
                console.log("data == 0")
                collection.insertOne(u,(err,data) => {
                    if (err) throw err;
                    res.send({"created":true})
                })
            }
            else{
                res.send({"created":false})
            }
            
        })
        
    })
}
    
















// var fs = require('fs')

// module.exports = function(req,res){
//     var u = req.body.username;
//     var p = req.body.pwd;

//     /newUserProfile
        
//     fs.readFile(__dirname + '/users.JSON', 'utf-8', function(err,data){
//             if (err) throw err;
//             let userLoginArray = JSON.parse(data)
          
//             for (let i = 0; i<userLoginArray.user.length; i++){
//                 // console.log(userArray.user[i].username)

//                 if (u == userLoginArray.user[i].username){
//                     valid = ({"user":true})
//                     console.log(userLoginArray.user[i].username+"True")
//                     break
//                 }
//                 else{
//                     valid = ({"user":false})
//                     console.log(userLoginArray.user[i].username+"False")
                    // newUserLogin = {"username": u, "pwd":p}
                    // userLoginArray.user.push(newUserLogin)
                    // console.log(userLoginArray.user)
                    // console.log(userLoginArray)
                // }
                    
                    
                    // fs.readFile(__dirname +'/userProfile.JSON', 'utf-8', function(err,data){
                    //     if (err) throw err;
                    //     let userProf = JSON.parse(data)
                    //     userProf.push(newUser)
                    // })
                    // fs.writeFile('/users.JSON', userProf, "utf-8", function(err){
                    //     if(err) throw err;
                    //     // res.send(uArray);
                    // })
                // }
        //     }
        //     res.send(valid)
        // })

        // console.log(usersLogin)
        // JSONuserLoginArray = JSON.stringify(userLoginArray)
        // console.log(valid)
        // fs.writeFile('/users.JSON', JSONuserLoginArray, "utf-8", function(err){
            
        //     if(err) throw err;
        //     // res.send(uArray);
        // })
        // console.log(newUser)
        // userArrayJson = JSON.stringify(userArray)
        // console.log(userArrayJson)
    
// }

