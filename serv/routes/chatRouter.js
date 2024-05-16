const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getAllConversationsForUser,
    getAllMessagesBetweenUsers,
    findconversation,
    lastMessage,
    deleteConversationAndMessages
} = require('../controller/userController/chat');

router.get('/messages/:userId1/:userId2', getAllMessagesBetweenUsers);

router.get('/lastmessage/:userId/:conversationId', lastMessage);
router.delete('/delteconversation/:conversationId', deleteConversationAndMessages);
router.get('/:userId/conversations', getAllConversationsForUser);
router.get('/:user1/:user2', findconversation);
// Route to send a message
router.post('/messages/send', sendMessage);

module.exports = router;