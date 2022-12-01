module.exports = function(db,app){
    
    app.post('/updateGroup', function(req,res){
        
        if(!req.body){
            return res.sendStatus(400)
        }
        var addedUserGroup = req.body;
        console.log(group)
        const collection = db.collection("groups");
        collection.find({groupname:addedUserGroup.groupname}).count((data)=>{
            if (data == 0){
                res.send("error")
            }
            else{
                collection.replaceOne({"groupname":group},{usernames:group.usernames}),(() => {
                    collection.find({}).toArray((data)=>{
                        res.send(data)
                    })
                })
            }
        })
    })
}