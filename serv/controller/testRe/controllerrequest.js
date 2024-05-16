const db = require('../../Model/index') 
const { Op } = require('sequelize');

exports.createRequest = async (req, res) => {
    const { userId, landId } = req.params
    if (!userId || isNaN(userId) || !landId || isNaN(landId)) {
        return res.status(400).send({ message: "Missing or invalid userId or landId. Both must be numeric." });
    }
    try {
        const request = await db.RequestLand.create({
            userId: parseInt(userId),
            landId: parseInt(landId),
            status: 'pending',
         
        });
        // req.io.emit('requestCreated', request); 
        res.status(201).send(request);
    } catch (error) {
      console.log(error);
        // res.status(500).send({ message: "Internal server error", details: error.message });
    }
};

exports.updateRequestStatus = async (req, res) => {
    const { requestId, status } = req.body; // status could be 'accepted' or 'rejected'
    try {
        const request = await db.RequestLand.update({ status }, {
            where: { id: requestId }
        });
        req.io.emit('requestUpdated', { requestId, status }); // Notify all clients
        res.status(200).send({ requestId, status });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getRequestByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const requests = await db.RequestLand.findAll({
            where: { userId },
            include: [{ model: db.Land }]
        });
        res.status(200).send(requests);
    } catch (error) {
        res.status(500).send(error.message);
    }
};