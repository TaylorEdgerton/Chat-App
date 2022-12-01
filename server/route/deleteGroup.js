module.exports = function(db,app){
    
    app.post('/deleteGroup', function(req,res){
        
        if(!req.body){
            return res.sendStatus(400)
        }
        var group = req.body.groupName;
        console.log(group)
        const collection = db.collection("groups");
        collection.deleteOne({"groupname":group}),(() => {
        })
        collection.find({}).toArray((err,data)=>{
            res.send(data)
        })   
    })
}