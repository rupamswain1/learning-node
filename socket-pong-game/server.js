const app = require('./app');
const server = require('http').createServer(app);
const socket = require('./socket');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;

server.listen(PORT);
console.log(`Listining on PORT: ${PORT}`);

socket.listen(io);
