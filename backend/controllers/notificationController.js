// notificationController.js
const Notification = require('../models/notificationModel');

// Get all notifications for a specific user
const getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    console.error('Failed to retrieve user notifications:', error);
    return [];
  }
};

// Add a new notification for a specific user
const addNotification = async ( content,userid,chatid) => {
  try {
    const newNotification = new Notification({message:content, user:userid,chat:chatid});
    await newNotification.save();
  } catch (error) {
    console.error('Failed to add notification:', error);
  }
};

const deleteNotification = async (notificationId) => {
    try {
      await Notification.findByIdAndDelete(notificationId);
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };
  module.exports = {
    getUserNotifications,
    addNotification,
    deleteNotification
  };