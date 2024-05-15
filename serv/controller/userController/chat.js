const { Op, NOW } = require('sequelize');
const {io} = require("../../index")
// const uploadImageToCloudinary = require('./uploadImageToCloudinary');
const db = require('../../Model/index');

const deleteConversationAndMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
ss
       
        const conversation = await db.Conversation.findByPk(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        await Message.destroy({
            where: {
                conversationId: conversation.id
            }
        });

    
        await Conversation.destroy({
            where: {
                id: conversation.id
            }
        });

        return res.status(200).json({ message: 'Conversation and messages deleted successfully' });
    } catch (error) {
        console.error('Error deleting conversation and messages:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



const lastMessage= async (req, res) => {
  const { userId, conversationId } = req.params;

  try {
    
    const conversation = await db.Conversation.findOne({
      where: {
        id: conversationId,
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }]
      }
    });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Fetch the last message of the conversation
    const lastMessage = await db.Chat.findOne({
      where: { conversationId },
      order: [['createdAt', 'DESC']]
    });

    res.json(lastMessage);
  } catch (error) {
    console.error('Error fetching last message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const sendMessage = async (req, res) => {
    try {
        const { senderId, recipientId, text } = req.body;
        if (!text.trim()) {
            return res.status(400).json({ error: 'Message text cannot be empty' });
        }

        let conversation = await db.Conversation.findOne({
            where: {
                [Op.or]: [
                    { user1Id: senderId, user2Id: recipientId },
                    { user2Id: senderId, user1Id: recipientId }
                ]
            }
        });

        if (!conversation) {
            conversation = await db.Conversation.create({
                user1Id: senderId,
                user2Id: recipientId,
            });
        }

        
        const message = await db.Chat.create({
            text,
            senderId,
            conversationId: conversation.id,
        });

        
        
        // io.emit('newMessage', { senderId, recipientId, message });

        return res.status(200).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




const getAllConversationsForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await db.User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

       
        const conversations = await db.Conversation.findAll({
            where: {
    
                [Op.or]: [{ user1Id: userId }, { user2Id: userId }]
            },
            include: [{ model: db.User, as: 'user1' }, { model: db.User, as: 'user2' }] 
        });

    
        return res.status(200).json(conversations);
    } catch (error) {
        console.error('Error getting conversations:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



const getAllMessagesBetweenUsers = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;

        
        const conversation = await db.Conversation.findOne({
            where: {
                user1Id: userId1,
                user2Id: userId2,
            }
        });

        if (!conversation) {
            
            return res.status(404).json({ error: 'Conversation not found' });
        }

       
        const messages = await db.Chat.findAll({
            where: {
                conversationId: conversation.id
            },
            order: [['createdAt', 'ASC']] 
        });

        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages between users:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const findconversation=  async(req,res)=>{
    try{
        const{user1,user2}=  req.params    
        let conversation = await db.Conversation.findOne({
            where: {
                [Op.or]: [
                    {
                        user1Id: user1,
                        user2Id: user2
                    },
                    {
                        user2Id: user2,
                        user1Id: user1
                    }
                ]
            }
        });
        return res.status(200).json(conversation);
    }
    catch(error){console.log(error);}
}




module.exports = {
    lastMessage,
    sendMessage,
    getAllConversationsForUser,
    findconversation,
    getAllMessagesBetweenUsers,
    deleteConversationAndMessages
};
