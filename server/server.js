const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const server = http.createServer(app);
const {Server} = require("socket.io");
const {RoomModel} = require("./models/Room.model");
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
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, () => {
    console.log("Database connected successfully...");
  })
  .catch((err) => console.log(err.message));

//Start the server
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

/* Temporary code storage */
const tempCode = {}; // stores temp codes like {room : { clients : num, code : '' }};
const clientToRoom = {}; // stores the room of a client

/* Socket code */

try {
  io.on("connection", (socket) => {
    socket.on("send-room", async (id) => {
      socket.join(id);

      clientToRoom[socket.id] = id;

      if (!(id in tempCode)) {
        tempCode[id] = {
          clients: 1,
          code: "",
          input: "",
          output: "",
        };

        const room = await RoomModel.findOne({id});
        const {roomCode} = room;
        tempCode[id].code = roomCode;
      } else {
        tempCode[id].clients++;
      }

      io.to(socket.id).emit("send-current-code", tempCode[id].code);
      io.to(socket.id).emit("send-current-input", tempCode[id].input);
      io.to(socket.id).emit("send-current-output", tempCode[id].output);
    });

    socket.on("code-changed", ({code, room}) => {
      //console.log(code, room);
      tempCode[room].code = code;
      io.to(room).emit("code-receive", code);
    });

    socket.on("input-changed", ({code, room}) => {
      tempCode[room].input = code;
      io.to(room).emit("input-receive", code);
    });

    socket.on("output-changed", ({code, room}) => {
      tempCode[room].output = code;
      io.to(room).emit("output-receive", code);
    });

    socket.on("disconnect", () => {
      try {
        const room = clientToRoom[socket.id];
        tempCode[room].clients--;

        delete clientToRoom[socket.id];
        if (tempCode[room].clients == 0) {
          delete tempCode[room];
        }

        console.log("disconnected");
      } catch (err) {
        console.log("Some error occured");
      }
    });
  });
} catch (err) {
  console.log("Some error occured in socket...");
}
