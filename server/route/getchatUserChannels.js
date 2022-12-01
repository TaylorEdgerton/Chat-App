module.exports = function(db,app){
    
    app.post('/chatUserChannels', function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }

        // userobj = {
        //     "username" : req.body.username,
        //     "email" : req.body.email,
        //     "role" : req.body.role
        // }

        var u = req.body.username

        const collection = db.collection('groups');
        collection.find({'usernames':{$in:[u]},'channels.usernames':{$in:[u]}}).project({"groupname":1, "channels":1}).toArray((err,data)=>{
            if (err) throw err;
            console.log("test")
            console.log(data)
            res.send(data)

        })
        
        // db.groups.aggregate([{$match:{'usernames':'Admin', 'channels.usernames':'Admin'}},{$project:{channels:{$filter:{input:"$channels",cond:{$in:['Admin',"$channels"]},as:"channel", limit:1}}}}])
    })


}
    
    
//     let userobj = {
//         "username" : req.body.username,
//         "email" : req.body.email,
//         // "profilePic": req.body.pic,
//         "role": req.body.role,
//     }
//     var u = req.body.username
//     let uArray = [];
//     fs.readFile(__dirname + '/usersProfile.JSON', 'utf-8', function(err,data){
//         if (err) throw err;
//         uArray=JSON.parse(data);
//         for (let i = 0; i < uArray.user.length; i++){
            
//             if (u == uArray.user[i].username){
//                 uArrayjson = uArray.user[i]
//                 uArrayjson = JSON.stringify(uArray);
//                 res.send(uArray.user[i])
//                 break
//             }
//             else{
//                 console.log("not valid User")
//             }
//         }
        
//     })

        
        
//         // fs.writeFile('../server/data/extendedUsers.json', uArrayjson, "utf-8", function(err){
//         //     if(err) throw err;
//         //     res.send(uArray);

//         // })

// }