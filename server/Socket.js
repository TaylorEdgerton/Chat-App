const { RSA_PKCS1_PADDING } = require("constants");

module.exports = {
    connect: function(io, PORT){
        io.on("connection", (socket) => {
            console.log('user connection on port ' + PORT + ":" + socket.id);
            socket.on("join server", (username) => {
                user = {
                    username : username,
                    id: socket.id
                };
                this.users.push(user);
                io.emit("new user", users);
            });
            

            socket.on('join room', (roomName)=>{
                socket.join(roomName);
                // cb(messages[roomName]);
                // socket.emit("joined", messages[roomName]);
            });
            socket.on('message', (message,roomName)=>{
                console.log(message)

                socket.in(roomName).emit('message', message);
            });
        });
    }
}


// module.exports = {
    
//     connect: function(io, PORT){
//         io.on("connection", (socket) => {
//             console.log('user connection on port ' + PORT + ":" + socket.id);

//                 socket.on('message', (message)=>{
//                     console.log(message)
//                 io.emit('message', message);
//                 });
//         });
//     }
// }