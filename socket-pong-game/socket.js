let readyPlayerCount = 0;
function listen(io) {
  const pomgNameSpace = io.of('/pong');
  let room;
  pomgNameSpace.on('connection', (socket) => {
    console.log('user connected to connection id: ', socket.id);

    socket.on('ready', () => {
      let room = 'room' + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log('Player Ready', socket.id);

      readyPlayerCount++;
      console.log(readyPlayerCount % 2 === 0);
      if (readyPlayerCount % 2 === 0) {
        console.log('emitting');
        pomgNameSpace.in(room).emit('startGame', socket.id);
      }
    });

    socket.on('paddleMove', (paddleData) => {
      socket.to(room).emit('paddleMove', paddleData);
    });

    socket.on('ballMove', (ballData) => {
      socket.to(room).emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
      console.log(`client with ${socket.id} disconnected, reason: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = { listen };
