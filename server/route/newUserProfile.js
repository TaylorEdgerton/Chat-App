module.exports = function(db,app){

    app.post('/newUserProfile', function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }
        userobj = req.body
        console.log(userobj)
        const collection = db.collection('users');
        collection.insertOne(userobj,(err,data) => {
            if (err) throw err;
            res.send({"created" : true})
        })
    })
}

    
    // let uArray = [];
    // fs.readFile(__dirname + '/usersProfile.JSON', 'utf-8', function(err,data){
    //     if (err) throw err;
    //     uArray = JSON.parse(data);
    //     uArray.user.push(userobj)
    //     // console.log(userobj)

    //     uArrayjson = JSON.stringify(uArray)
    //     console.log(uArrayjson)
    //     fs.writeFile(__dirname + '/usersProfile.JSON', uArrayjson, 'utf-8', function(err) {
    //         if (err) throw err;
    //         res.send(uArray)
    // })
    // })


        
        
        // fs.writeFile('../server/data/extendedUsers.json', uArrayjson, "utf-8", function(err){
        //     if(err) throw err;
        //     res.send(uArray);

        // })

// }