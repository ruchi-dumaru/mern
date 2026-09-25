const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 2000,
    },
    // message delete for me / for everyone
    // read/unseen status flag
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  },
);

const ChatModel = mongoose.model("Chat", ChatSchema);

module.exports = ChatModel;
