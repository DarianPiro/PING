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

let users = [];
const User = require('./models/User');

io.on('connection', (socket) => {
  console.log(`👽 User ${socket.id} connected 👽`);
  socket.emit('me', socket.id);

  socket.on('userConnected', ({ name }) => {
    const user = { socketID: socket.id, name };

    const userExists = users.find((u) => u.name === name);
    if (userExists) {
      users = users.map((u) => (u.name === name ? user : u));
    } else {
      users.push(user);
    }

    // User.findOneAndUpdate(
    //   { username: name },
    //   { socketID: socket.id, online: true },
    //   (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   }
    // );

    // let users = User.find({ online: true }, (err, users) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    io.emit('users', users);
  });

  socket.on('disconnect', () => {
    users = users.filter((u) => u.socketID !== socket.id);
    io.emit('users', users);
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });

  socket.on('stroke', ({ recipientID, stroke }) => {
    io.to(recipientID).emit('stroke', stroke);
  })

});
app.use(express.json());
app.use(router);
server.listen(port, () =>
  console.log(`🧲 Server running on http://localhost:${port} 🧲`)
);
