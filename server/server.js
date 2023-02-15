const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const {ProxyRouter} = require("./routes/proxy");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/", ProxyRouter);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

/* Socket code */

io.on('connection', (socket) => {
  console.log(`${socket.id} connected to server successfully`);
  socket.on('disconnect', () => {
    console.log('disconnected');
  })
});
