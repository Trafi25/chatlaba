let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


app.listen(PORT, () => {
    console.log('Listening on port *: 3000');
});

io.on('connection', (socket) => {
    console.log("A user connected");

    socket.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });   

});