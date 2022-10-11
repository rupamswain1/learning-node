const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

server.listen(PORT);
console.log(`Listining on PORT: ${PORT}`);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
  console.log('user connected to connection id: ', socket.id);

  socket.on('ready', () => {
    console.log('Player Ready', socket.id);

    readyPlayerCount++;
    console.log(readyPlayerCount === 2);
    if (readyPlayerCount === 2) {
      console.log('emitting');
      io.emit('startGame', socket.id);
    }
  });

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData);
  });
});
