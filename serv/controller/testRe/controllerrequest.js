const db = require('../../Model/index') 
const { Op, where } = require('sequelize');
// const {io} =require ('../../socket')

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


exports.createRequestHouse = async (req, res) => {
    const { userId, houseId } = req.params;
    console.log(req.params, 'params received');
  
    if (!userId || isNaN(userId) || !houseId || isNaN(houseId)) {
        return res.status(400).send({ message: "Missing or invalid userId or houseId. Both must be numeric." });
    }

    try {
    




        const request = await db.RequestHouse.create({
            userId: parseInt(userId),
            houseId: parseInt(houseId),
            status: 'pending'
        });
        console.log('Request created:', request);
        
        // req.io.emit('requestHouseCreated', request);
        res.status(201).send(request);
    } catch (error) {
        console.log('Error creating request:', error);
        res.status(500).send({ message: "Internal server error", details: error.message });
    }
};

// Update request for land
exports.updateRequestLand = async (req, res) => {
    const { userId, landId } = req.params;
    const { status } = req.body;

    if (!userId || isNaN(userId) || !landId || isNaN(landId) || !status) {
        return res.status(400).send({ message: "Missing or invalid parameters." });
    }

    try {
        const updatedRequest = await db.RequestLand.update(
            { status },
            { where: { userId: parseInt(userId), landId: parseInt(landId) } }
        );

        if (updatedRequest[0] === 0) {
            return res.status(404).send({ message: "Request not found." });
        }

        res.status(200).send({ message: "Request updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error", details: error.message });
    }
};


exports.updateRequestHouse = async (req, res) => {
    const { userId, houseId } = req.params;
    const { status } = req.body;

    if (!userId || isNaN(userId) || !houseId || isNaN(houseId) || !status) {
        return res.status(400).send({ message: "Missing or invalid parameters." });
    }

    try {
        const updatedRequest = await db.RequestHouse.update(
            { status },
            { where: { userId: parseInt(userId), houseId: parseInt(houseId) } }
        );

        if (updatedRequest[0] === 0) {
            return res.status(404).send({ message: "Request not found." });
        }

        res.status(200).send({ message: "Request updated successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error", details: error.message });
    }
};

exports.getRequestByUser = async (req, res) => {
    const { userId, type } = req.params;

    try {
        let requests;

        if (type === 'land') {
            requests = await db.RequestLand.findAll({
                where: { userId },
                include: [{ model: db.Land }]
            });
        } else if (type === 'house') {
            requests = await db.RequestHouse.findAll({
                where: { userId },
                include: [{ model: db.House }]
            });
        } else {
            return res.status(400).send('Invalid request type');
        }

        res.status(200).send(requests);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.getRequestByOwner = async (req, res) => {
    const { userId, type } = req.params;

    try {
        let requests;

        if (type === 'land') {
            requests = await db.RequestLand.findAll({
                include: [{
                    model: db.Land,
                    as: 'land',
                    where: { userId: userId },
                    include: [{
                        model: db.User,
                        as: 'owner',
                        where: { id: userId }
                    }]
                }]
            });
        } else if (type === 'house') {
            requests = await db.RequestHouse.findAll({
                include: [{
                    model: db.House,
                    as: 'house',
                    where: { userId: userId },
                    include: [{
                        model: db.User,
                        as: 'owner',
                        where: { id: userId }
                    }]
                }]
            });
        } else {
            return res.status(400).send('Invalid request type');
        }

        res.status(200).send(requests);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.check = async (req, res) => {
    const { userId, landId, houseId } = req.query;

    try {
        let request;
        if (landId) {
            request = await db.RequestLand.findOne({
                where: { userId: parseInt(userId), landId: parseInt(landId) }
            });
        } else if (houseId) {
            request = await db.RequestHouse.findOne({
                where: { userId: parseInt(userId), houseId: parseInt(houseId) }
            });
        }

        res.send({ hasRequested: !!request });
    } catch (error) {
        console.log('Error checking request status:', error);
        res.status(500).send({ message: "Internal server error", details: error.message });
    }
};




