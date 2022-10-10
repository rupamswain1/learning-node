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

io.on('connection', (socket) => {
  console.log('user connected to connection id: ', socket.id);
});
