module.exports = function(db,app){
    
    app.post('/getGroups', function(req,res){
        user = req.body.username
        if(!req.body){
            return res.sendStatus(400)
        }
        
        const collection = db.collection("groups");
        collection.find({usernames:user}).toArray((err,data) => {
            // console.log(data)
            res.send(data)
    
        })
    })
}