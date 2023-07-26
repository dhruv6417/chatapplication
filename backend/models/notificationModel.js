// models/Notification.js

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
 required:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
