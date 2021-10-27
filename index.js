const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS", "PUT"]
    }
});

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  socket.on('joinGame', gameId => {
    console.log('joinGame: ', gameId);
    socket.join(gameId);
    io.to(gameId).emit("joinedGame", gameId)
  });
  socket.on('drawing', data => {
    console.log('drawing: ', data);
    io.to(data.room).emit("drawing", data)
  });
  
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});