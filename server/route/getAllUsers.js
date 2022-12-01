module.exports = function(db,app){
    
    app.get('/getAllUsers', function(req,res){
        role = req.body.role
        if(!req.body){
            return res.sendStatus(400)
        }
        
        const collection = db.collection("users");
        collection.find({}).toArray((err,data) => {
 
        
            res.send(data)
    
        })
    })
}