const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController/UserController'); 
const { User, House, Land, Media } = require('../Model/');

router.get('/all', UserController.getAllUsers);
router.post('/postMany', UserController.insertAllUsers); 
router.put('/:id', UserController.updateUser);
router.get('/:id', UserController.getUser);
router.get('/:userId/posts', UserController.getUserPosts);
router.get('/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    try {
        const houses = await House.findAll({
            where: { userId },
            include: [Media]
        });

        const lands = await Land.findAll({
            where: { userId },
            include: [Media]
        });

        res.json({ houses, lands });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user posts' });
    }
});
router.get('/:userId/posts', async (req, res) => {
    const { userId } = req.params;
    try {
      const houses = await House.findAll({
        where: { userId },
        include: [
          { model: Media, attributes: ['type', 'name', 'link'] },
          { model: Indoor, attributes: ['options'] },
          { model: Climate, attributes: ['options'] },
          { model: Outdoor, attributes: ['options'] },
          { model: View, attributes: ['options'] },
        ],
      });
  
      const lands = await Land.findAll({
        where: { userId },
        include: [Media],
      });
  
      res.json({ houses, lands });
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Failed to fetch user posts' });
    }
  });
  
module.exports = router;
