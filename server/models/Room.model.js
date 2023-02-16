const mongoose = require("mongoose");
const {Schema} = mongoose;

const RoomSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  roomCode: {
    type: String,
    default: "",
  },
});

module.exports = {
  RoomModel: mongoose.model("Room", RoomSchema),
};
