const express = require('express');
const router = require('./router');
const cors = require('cors');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
app.use(cors());

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`👽 User ${socket.id} connected 👽`);
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});
app.use(express.json());
app.use(router);
server.listen(port, () =>
  console.log(`🧲 Server running on http://localhost:${port} 🧲`)
);
