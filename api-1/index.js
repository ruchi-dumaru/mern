const http = require("http"); //es5
const app = require("./src/config/express.config.js");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const authService = require("./src/app/auth/auth.service");
const ChatModel = require("./src/app/chat/chat.model");
const { AppConfig } = require("./src/config/config");
// const httpServer= http.createServer((req,res)=>{
// if(req.method==='GET' && req.url==='/product'){
//   let product=[];
//   res.end(JSON.stringify(product));
// }else if(req.method==='GET' && req.url==='/home'){
//   res.end("This is home default page");
// }else{
//   res.end("Hello World");
// }
// })

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.use(async (socket, next) => {
  try {
    let token =
      socket.handshake.auth?.token || socket.handshake.headers.authorization;
    if (!token) return next(new Error("Unauthorized socket connection"));
    token = token.replace(/^Bearer\s+/i, "");
    const session = await authService.getSingleRowByFilter({
      accessToken: token,
    });
    const decoded = jwt.verify(token, AppConfig.jwtSecret);
    if (!session?.user || decoded.typ !== "Bearer")
      return next(new Error("Unauthorized socket connection"));
    socket.user = session.user;
    next();
  } catch (exception) {
    next(new Error("Unauthorized socket connection"));
  }
});

io.on("connection", (socket) => {
  socket.join(`user:${socket.user._id}`);

  socket.on("online", () => {
    socket.broadcast.emit("userOnline", { userId: socket.user._id });
  });

  socket.on("newMessage", async (data, callback) => {
    try {
      const receiver = String(data?.receiver || "");
      const message = String(data?.message || "").trim();
      if (!receiver || !message || message.length > 2000)
        throw new Error("Receiver and message are required");
      const chat = await ChatModel.create({
        sender: socket.user._id,
        receiver,
        message,
      });
      const savedChat = await ChatModel.findById(chat._id)
        .populate("sender", ["_id", "name", "email", "role", "image"])
        .populate("receiver", ["_id", "name", "email", "role", "image"]);
      io.to(`user:${socket.user._id}`)
        .to(`user:${receiver}`)
        .emit("messageReceive", savedChat);
      if (callback) callback({ ok: true, data: savedChat });
    } catch (exception) {
      if (callback)
        callback({
          ok: false,
          message: exception.message || "Message could not be sent",
        });
    }
  });
});

const HOST = "127.0.0.1";
const PORT = "9006";

httpServer.listen(PORT, HOST, (err) => {
  console.log("Server is running successfully...");
});
