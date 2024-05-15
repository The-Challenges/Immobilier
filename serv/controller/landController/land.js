const db = require('../../Model/index');

module.exports = {
    getAllHouses: async (req, res) => {
        try {
            const houses = await db.Land.findAll();
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: `Error fetching houses: ${error.message}` });
        }
    },
    
    insertAllHouses: async (req, res) => {
        try {
            const land = await db.Land.bulkCreate(dummyLand);
            res.status(200).json({ success: true, message: "Land added successfully", data: land });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to add land", error: error.message });
        }
    },

    addLand: async (req, res) => {
        try {
            const { title, price, size, alt, long, purchaseoption, TerrainType, Zoning, isVerifie, viewOptions, accessOptions } = req.body;
            const newLand = await db.Land.create({
                title,
                price,
                size,
                alt,
                long,
                purchaseoption,
                TerrainType,
                Zoning,
                isVerifie
            });
                const newView = await db.View.create({
                options: viewOptions || 'Unknown'
            });
    
            // Create an access entry
            const newAccess = await db.Access.create({
                options: accessOptions || 'Unknown'
            });
            await newLand.addView(newView);
            await newLand.addAccess(newAccess);
    
            res.status(201).json({ success: true, message: "Land, view, and access added successfully", data: { newLand, newView, newAccess } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to add land", error: error.message });
        }
    },
    
    updateLand: async (req, res) => {
        try {
            const { landId } = req.params;
            const {
                title, price, size, alt, long, purchaseoption, TerrainType, Zoning, isVerifie, viewOptions, accessOptions
            } = req.body;

            // Check if the land exists
            let land = await db.Land.findByPk(landId);
            if (!land) {
                return res.status(404).json({ success: false, message: "Land not found" });
            }

            // Update land properties
            land.title = title;
            land.price = price;
            land.size = size;
            land.alt = alt;
            land.long = long;
            land.purchaseoption = purchaseoption;
            land.TerrainType = TerrainType;
            land.Zoning = Zoning;
            land.isVerifie = isVerifie;

            // Save the updated land
            await land.save();

            // Update associated view if provided
            if (viewOptions) {
                let view = await db.View.findOne({ where: { LandId: landId } });
                if (!view) {
                    view = await db.View.create({ options: viewOptions });
                    await land.addView(view);
                } else {
                    view.options = viewOptions;
                    await view.save();
                }
            }

            // Update associated access if provided
            if (accessOptions) {
                let access = await db.Access.findOne({ where: { LandId: landId } });
                if (!access) {
                    access = await db.Access.create({ options: accessOptions });
                    await land.addAccess(access);
                } else {
                    access.options = accessOptions;
                    await access.save();
                }
            }

            res.status(200).json({ success: true, message: "Land updated successfully", data: land });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to update land", error: error.message });
        }
    },

    addAccessToLand: async (req, res) => {
        try {
            const { landId } = req.params;
            const { options } = req.body;

            // Check if the land exists
            const land = await db.Land.findByPk(landId);
            if (!land) {
                return res.status(404).json({ success: false, message: "Land not found" });
            }

            // Add access to the land
            const access = await db.Access.create({ options });
            await land.addAccess(access);

            res.status(201).json({ success: true, message: "Access added to land successfully", data: access });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to add access to land", error: error.message });
        }
    },

    addViewToLand: async (req, res) => {
        try {
            const { landId } = req.params;
            const { options } = req.body;

            // Check if the land exists
            const land = await db.Land.findByPk(landId);
            if (!land) {
                return res.status(404).json({ success: false, message: "Land not found" });
            }

            // Add view to the land
            const view = await db.View.create({ options });
            await land.addView(view);

            res.status(201).json({ success: true, message: "View added to land successfully", data: view });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to add view to land", error: error.message });
        }
    }
};
