const express = require('express');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

// Route to get all notifications for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await notificationController.getUserNotifications(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve notifications' });
  }
});

// Route to add a new notification for a specific user
router.post('/', async (req, res) => {
  const { userId, content } = req.body;
  try {
    await notificationController.addNotification(userId, content);
    res.status(201).json({ message: 'Notification added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add notification' });
  }
});

// Route to delete a notification when it is viewed
router.delete('/:notificationId', async (req, res) => {
  const { notificationId } = req.params;
  try {
    await notificationController.deleteNotification(notificationId);
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

module.exports = router;
