const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const {ProxyRouter} = require("./routes/proxy");
const RoomRouter = require("./routes/room");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/", ProxyRouter);
app.use("/room", RoomRouter);

//DB config using Mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Database connected successfully...");
}).catch(err => console.log(err.message));

//Start the server
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})

/* Socket code */

io.on("connection", (socket) => {
  console.log(`${socket.id} connected to server successfully`);
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
