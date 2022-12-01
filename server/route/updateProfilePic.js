module.exports = function(db,app){
    
    app.post('/updateProfilePic', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var u = req.body.username;
        var p = req.body.profilePic;
        const collection = db.collection('users');
        console.log(u)
        console.log(p)
        collection.updateOne({username:u},{$set:{profilePic:p}},(err,data) => {
            console.log(data)
            res.send({"Updated":true})
        
        })
    })
}