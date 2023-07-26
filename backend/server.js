const express=require("express");
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoutes")
const chatRoutes=require("./routes/chatRoutes")
const messageRoutes=require("./routes/messageRoutes")
const notificationRoutes=require("./routes/notificationRoutes")
const notificationController=require("./controllers/notificationController")
const User =require("./models/userModel")
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require('cors')



dotenv.config();
connectDB();
const app=express();
const BASE_URL=process.env.BASE_URL
app.use(cors())

app.use(express.json()); // to accept json data
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT =process.env.PORT||5000

const server=app.listen(PORT,console.log("serverconnected"));
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: `${BASE_URL}`,
    
    },
  });
  
  io.on("connection", (socket) => {
    //console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
    socket.on('user connected', async (userid) => {
      try {
        // Update the user's isOnline status to true in the database
        await User.findByIdAndUpdate(userid, { isOnline: true });
      // Notify all clients about the user's status change
    io.emit('userStatusUpdate', { userid, isOnline: true });

      } catch (error) {
        console.error('Failed to update user status:', error);
      }
    });
    socket.on('user disconnected', async (userid) => {
      // Get the userId from the socket or somewhere in your authentication process
     // Replace with your logic to get the userId
      if (userid) {
        try {
          //console.log("disconnected")
    // Notify all clients about the user's status change
   io.emit('userStatusUpdate', { userid, isOnline: false });

          // Update the user's isOnline status to false in the database
          await User.findByIdAndUpdate(userid, { isOnline: false });
        } catch (error) {
          console.error('Failed to update user status:', error);
        }
      }
    });

  
    socket.on("join chat", (room) => {
      socket.join(room);
      //console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users not defined");
  
     chat.users.forEach(async (user) => {
        if (user._id == newMessageRecieved.sender._id) return;
     var  message= chat.isGroupChat
          ? `New Message in ${chat.chatName}`
          : `New Message from ${newMessageRecieved.sender.name}`
        await notificationController.addNotification(message,user._id,chat._id)
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", async() => {
         // Update the user's isOnline status to false in the database
      //console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
});