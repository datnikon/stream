const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }, path: "/socket"
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId);
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId);
        })
        socket.on('chat', (content) => {
            socket.broadcast.to(roomId).emit('new-message', content);
        })
    })

});
const port = 3000;
server.listen(port, () => console.log('listening on port' + port));