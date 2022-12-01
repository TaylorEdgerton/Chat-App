module.exports = function(db,app){
    
    app.post('/addGroup', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var u = req.body;
        
        const collection = db.collection('groups');
        collection.find({"groupname":u.groupname}).count((err,data)=>{
            console.log(u)
            if (data == 0){
                collection.insertOne(u,(err,data) => {
                    if (err) throw err;
                    res.send({"created":true})
                })
            }
            else{
                res.send({"created":false})
            }
            
        })
        
    })
}
    





