module.exports = function(db,app){
    
    app.post('/loginValidate', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var u = req.body.username;
        var p = req.body.pwd;
        console.log(u+p)
        const collection = db.collection('users');
        collection.find({"username":u}).toArray((err,data)=>{
            this.valid = ({"user":false})
            console.log(data)
            if (data.length != 0){
                if (u == data[0].username && p == data[0].pwd){
                    valid = ({"user":true})
                    res.send(valid)
                }
                else{
                    valid = ({"user":false})
                    res.send(valid)
                }
                
            }
            else{
                valid = ({"user":false})
                res.send(valid)
            }
            
        })
    })
}
    


//     fs.readFile(__dirname + '/usersProfile.JSON', 'utf-8', function(err,data){
//         if (err) throw err;
//         let userArray = JSON.parse(data)
//         for (let i = 0; i<userArray.user.length; i++){
//             // console.log(userArray.user[i].username)

//             if (u == userArray.user[i].username && p == userArray.user[i].pwd){
//                 valid = ({"user":true})
//                 break
//             }
//             else{
//                 valid = ({"user":false})
//             }
//         }

//         res.send(valid)

//     })
// })
// }  

