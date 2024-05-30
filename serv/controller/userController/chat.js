// controllers/chatController.js
const db = require('../../Model/index');
const { Op } = require('sequelize');

// Add this to your chatController.js or where you manage creating conversations
const createMessage = async (req, res) => {
    const { conversationId, message, senderId, timestamp } = req.body;
    try {
      const conversation = await db.Conversation.findByPk(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      const newMessage = await db.Chat.create({
        ConversationId: conversationId,
        message,
        senderId,
        time: timestamp
      });
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  };
  
  const getMessages = async (req, res) => {
    const { conversationId, userId } = req.params;
    try {
      const conversation = await db.Conversation.findByPk(conversationId, {
        include: [{ model: db.User, as: 'Participants', attributes: ['id'] }]
      });
  
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      const messages = await db.Chat.findAll({
        where: { ConversationId: conversationId },
        order: [['time', 'ASC']],
        include: [{ model: db.User, as: 'Sender', attributes: ['id', 'username'] }]
      });
  
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };

  
  

const getUserConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await db.Conversation.findAll({
      where: {
        [Op.or]: [
          { User1Id: userId },
          { User2Id: userId },
        ],
      },
      include: [
        { model: db.User, as: 'User1', attributes: ['id', 'firstName'] },
        { model: db.User, as: 'User2', attributes: ['id', 'firstName'] },
      ],
    });

    console.log('Fetched conversations:', conversations);

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

const createConversation = async (req, res) => {
  const { user1Id, user2Id } = req.body;

  try {
    const conversation = await db.Conversation.create({
      User1Id: user1Id,
      User2Id: user2Id,
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
};

const deleteConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    await db.Conversation.destroy({
      where: { id: conversationId },
    });

    res.status(200).json({ message: 'Conversation deleted' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getUserConversations,
  createConversation,
  deleteConversation,
};
