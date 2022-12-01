
module.exports = function(db,app){
    
    app.post('/deleteUser', function(req,res){
        
        if(!req.body){
            return res.sendStatus(400)
        }
        var user = req.body;
        console.log(user)
        const collection = db.collection("users");
        collection.deleteOne({"username":user.username}),((data) => {
        })
        collection.find({}).toArray((err,data)=>{
            res.send(data)
        })   
        
    })
}
