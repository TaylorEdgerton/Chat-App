module.exports = function(db,app){
    
    app.post('/validUser', function(req,res){
        if (!req.body){
            return res.sendStatus(400)
        }
        var u = req.body.username
        console.log(u)
        const collection = db.collection('users');
        collection.find({"username":u}).toArray((err,data)=>{
            if (err) throw err;
            console.log(data)
            res.send(data)
        })
    })


}
