module.exports = function(db,app){
    
    app.post('/updateMessageHistory', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        var message=req.body
        const collection = db.collection("groups");

        collection.updateOne({'groupname': {$in:[message.group]},'channels.channelNum' :{$in:[message.channel]}}, {$push:{'channels.$.messageHistory':message}}),((err,data) => {
            console.log(err)
            console.log(data)

            res.send({"sent":true})
        
        })
    })
}


