const House = require('../Model/house'); // Import your House model

exports.getAllHouses = async (req, res) => {
    try {
        const houses = await House.findAll();
        res.json(houses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createHouse = async (req, res) => {
    
    try {
        const newHouse = await House.create(req.body);
        res.status(201).json(newHouse);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateHouse = async (req, res) => {
    try {
        const updatedHouse = await House.update(req.body, {
            where: { houseId: req.params.houseId }
        });
        res.json(updatedHouse);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteHouse = async (req, res) => {
    try {
        await House.destroy({
            where: { houseId: req.params.houseId }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getHouseById = async (req, res) => {
    try {
        const house = await House.findByPk(req.params.houseId);
        if (!house) {
            res.status(404).send('House not found');
        } else {
            res.json(house);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
