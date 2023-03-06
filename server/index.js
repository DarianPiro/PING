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
const User = require('./models/User');
io.on('connection', (socket) => {
  console.log(`👽 User ${socket.id} connected 👽`);
  socket.emit('me', socket.id);

  socket.on('userConnected', async ({ name }) => {
    await User.findOneAndUpdate(
      { username: name },
      { socketID: socket.id, online: true }
    );
    let users = await User.find({ online: true });
    io.emit('users', users);
  });

  socket.on('newRequest', async () => {
    let users = await User.find({ online: true });
    io.emit('users', users);
  });

  socket.on('disconnect', async () => {
    await User.findOneAndUpdate(
      { socketID: socket.id },
      { socketID: '', online: false }
    );
    let users = await User.find({ online: true });
    io.emit('users', users);
    socket.broadcast.emit('callEnded');
  });

  socket.on('leaveCall', async ({ recipientID, senderID }) => {
    await User.findOneAndUpdate(
      { $or: [{ socketID: recipientID }, { socketID: senderID }] },
      { $set: { 'requests.$[elem].status': 'Completed' } },
      {
        arrayFilters: [{ 'elem.date': { $lte: new Date() } }],
        new: true,
        sort: { 'requests.date': -1 },
      }
    );
    io.to(recipientID).emit('callEnded');
    io.to(senderID).emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  socket.on('stroke', ({ recipientID, stroke }) => {
    io.to(recipientID).emit('stroke', stroke);
    console.log(recipientID);
  });
});
app.use(express.json());
app.use(router);
server.listen(port, () =>
  console.log(`🧲 Server running on http://localhost:${port} 🧲`)
);
