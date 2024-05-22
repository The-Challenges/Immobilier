const express = require('express');
const { Sequelize } = require('sequelize'); 
const { Conversation, User, Chat } = require('../Model'); 

const router = express.Router();

router.post('/start', async (req, res) => {
  const { user1Id, user2Id } = req.body;
  try {
    const conversation = await Conversation.create({
      User1Id: user1Id,
      User2Id: user2Id,
    });
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start conversation' });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Sequelize.Op.or]: [{ User1Id: userId }, { User2Id: userId }],
      },
      include: [
        { model: User, as: 'User1' },
        { model: User, as: 'User2' },
        { model: Chat },
      ],
    });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});



router.post('/saveMessage',async (req, res) => {
  const { conversationId, message, time } = req.body;
  try {
    const chat = await Chat.create({ conversationId, message, time });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
}
)
router.get('/getMessages/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await Chat.findAll({
      where: { conversationId },
      order: [['time', 'ASC']],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
})

module.exports = router;
