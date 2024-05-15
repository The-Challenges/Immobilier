const express = require('express');
const router = express.Router();
const LandController = require('../controller/request/request');
router.get('/seller/:userId/:type',LandController.getAllEstateBySeller)
router.get('/:userId/:type',LandController.getAllEstateByBuyer)
router.post('/:userId/:houseId/:type',LandController.createRequest)

router.get('/estate/:estateId/:type',LandController.getAllRequestByEstateId)
router.post('/updateLandRequestStatus/:requestId', LandController.updateLandRequestStatus);
router.post('/updateStatus/:requestId', LandController.updateRequestStatus);








router.get('/allrequests/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const sentRequests = await db.RequestLand.findAll({
            where: { userId: userId },
            include: [{ model: db.Land }] 
        });
        const receivedRequests = await db.RequestLand.findAll({
            where: { receiverId: userId },
            include: [{ model: db.Land }]
        });
        res.json({
            sent: sentRequests,
            received: receivedRequests
        });
    } catch (error) {
        console.error("Failed to fetch requests:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;