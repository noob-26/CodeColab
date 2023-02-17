const express = require("express");
const router = express.Router();
const {RoomModel} = require("../models/Room.model");

router.post("/create", (req, res) => {
  const {id, code} = req.body;
  //console.log(id, code);

  const newRoom = new RoomModel({
    id,
    roomCode: code,
  });

  newRoom
    .save()
    .then(() => {
      res.status(200).json({
        message: "New Room created successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong. Please Try again",
      });
    });
});

router.post("/savecode", async (req, res) => {
  const {code, id} = req.body;

  try {
    const room = await RoomModel.findOne({id});
    if (!room) {
      res.status(400).json({
        message: "Invalid room Code",
      });
      return;
    }

    await RoomModel.findOneAndUpdate(
      {id},
      {
        roomCode: code,
      }
    );

    res.status(200).json({
      message: "Code saved successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong! Please try again.",
    });
  }
});

router.get("/find/:id", async (req, res) => {
  const {id} = req.params;
  const room = await RoomModel.findOne({id});
  //console.log(room);
  try {
    if (room) {
      res.status(200).json({
        message: "Room found",
      });
    } else {
      res.status(200).json({
        message: "Room not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
