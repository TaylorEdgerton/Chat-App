module.exports = function(db,app){
    
    app.post('/getAllGroups', function(req,res){
        role = req.body.role
        if(!req.body){
            return res.sendStatus(400)
        }
        
        const collection = db.collection("groups");
        collection.find({}).toArray((err,data) => {
            console.log(data)
            if (role == "SuperAdmin" || "GroupAdmin"){
                res.send(data)
            }
        
            
    
        })
    })
}