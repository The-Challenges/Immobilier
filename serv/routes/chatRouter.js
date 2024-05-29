const express = require('express');
const router = express.Router();
const chatController = require('../controller/userController/chat');

router.post('/message', chatController.createMessage);
router.get('/:conversationId/:userId', chatController.getMessages);
router.get('/conversations/:userId', chatController.getUserConversations);
router.post('/conversation', chatController.createConversation);
router.delete('/conversation/:conversationId', chatController.deleteConversation);

module.exports = router;
