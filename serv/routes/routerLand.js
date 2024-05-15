const express = require('express');
const router = express.Router();
const db = require('../Model/index');
const LandController = require('../controller/landController/land');

router.get('/alllands',LandController.getAllLands)
router.get('/filterlands',LandController.filterLands)

router.post('/createlands',LandController.createlands)





// Get all requests for a user
router.get('/requests/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const requests = await db.RequestLand.findAll({
            where: { userId },
            include: [db.User, db.Land]
        });
        res.json(requests);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Post a new request
router.post('/requests', async (req, res) => {
    try {
        const { userId, landId } = req.body;
        const newRequest = await db.RequestLand.create({ userId, landId, status: 'pending' });
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;


