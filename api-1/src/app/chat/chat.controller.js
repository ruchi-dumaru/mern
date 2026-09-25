const ChatModel = require("./chat.model");

class ChatController {
  async addChat(req, res, next) {
    try {
      const data = req.body;
      const loggedInUser = req.loggedInUser;

      data.sender = loggedInUser._id;

      const chat = new ChatModel(data);
      await chat.save();

      const recentChat = await ChatModel.findOne({ _id: chat._id })
        .populate("sender", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])

        .populate("receiver", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ]);
      res.json({
        data: recentChat,
        message: "Your Chat",
        status: "CHAT_SENT",
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getChatList(req, res, next) {
    try {
      const loggedInUser = req.loggedInUser;
      const user = req.params.receiver;

      let filter = {
        $or: [
          {
            sender: loggedInUser._id,
            receiver: user,
          },
          {
            sender: user,
            receiver: loggedInUser._id,
          },
        ],
      };
      const chatList = await ChatModel.find(filter)
        .populate("sender", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ])

        .populate("receiver", [
          "_id",
          "name",
          "email",
          "address",
          "phone",
          "dob",
          "status",
          "gender",
          "image",
          "role",
        ]);

      res.json({
        data: chatList,
        message: "Chat message",
        status: "CHAT_LIST",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

module.exports = new ChatController();
