module.exports = function(db,app){
    
    app.post('/getMessageHistory', function(req,res){
        console.log("getMessageHistoryReq")
        console.log(req.body)
        channel = req.body.channelNum
        group = req.body.groupname
        if(!req.body){
            return res.sendStatus(400)
        }
        
        const collection = db.collection("groups");
        collection.find({'groupname':{$in:[group]}, 'channels.channelNum':{$in:[channel]}}).project({"groupname":1, "channels.$":1}).toArray((err,data) => {
            console.log('getMessageHistory')
            console.log(data)
            res.send(data)
    
        })
    })
}