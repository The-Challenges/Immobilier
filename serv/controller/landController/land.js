const db = require('../../Model/index');
const media = require('../../Model/media');
module.exports = {
    getAllLands: async (req, res) => {
        try {

            const houses = await db.Land.findAll({
                include: [
                    {
                        model: db.Media,
                        attributes: ['type', 'name', 'link']
                    },
                    {
                        model: db.Access // Assuming Access is the model for access related to a land
                    },
                    {
                        model: db.View // Assuming View is the model for views related to a land
                    },
                    {
                        model: db.Comment // Assuming Comment is the model for comments related to a land
                    },
                    {
                       model: db.User ,
                       attributes:['firstName','email','phoneNumber']
                    },


                ]
            });
            res.json(houses)

        } catch (error) {
            res.status(500).json({ error: `Error fetching lands: ${error.message}` });
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

     addLand : async (req, res) => {
        try {
            const {
                title, price, size, alt, long, purchaseoption, TerrainType, Zoning, isVerifie,
                viewOptions, accessOptions, media, userId
            } = req.body;
    
            const result = await db.sequelize.transaction(async (t) => {
                // Create the land
                const newLand = await db.Land.create({
                    title,
                    price: price !== '' ? price : null,
                    size: size !== '' ? size : null,
                    alt: alt !== '' ? alt : null,
                    long: long !== '' ? long : null,
                    purchaseoption,
                    TerrainType,
                    Zoning,
                    isVerifie,
                    userId  // Ensure userId is saved
                }, { transaction: t });
    
                // Additional data relations
                if (viewOptions && viewOptions.length > 0) {
                    const views = viewOptions.map(option => ({ options: option, LandId: newLand.id }));
                    await db.View.bulkCreate(views, { transaction: t });
                }
                if (accessOptions && accessOptions.length > 0) {
                    const accesses = accessOptions.map(option => ({ options: option, LandId: newLand.id }));
                    await db.Access.bulkCreate(accesses, { transaction: t });
                }
    
                // Create media associated with the land
                if (media && media.length > 0) {
                    const mediaItems = media.map(item => ({
                        type: "jpg",
                        name: "photo",
                        link: item,
                        LandId: newLand.id
                    }));
                    await db.Media.bulkCreate(mediaItems, { transaction: t });
                }
    
                return newLand;
            });
    
            res.status(201).json({ success: true, message: "Land, view, access, and media added successfully", data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to add land", error: error.message });
        }
    },
    
    
    getLandsByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const lands = await db.Land.findAll({
                where: { userId },
                include: [
                    {
                        model: db.Media,
                        attributes: ['type', 'name', 'link']
                    },
                    {
                        model: db.Access
                    },
                    {
                        model: db.View
                    }
                ]
            });
            res.json(lands);
        } catch (error) {
            res.status(500).json({ error: `Error fetching lands: ${error.message}` });
        }
    },
    getLandById: async (req, res) => {
        const { id } = req.params;
        try {
            const land = await db.Land.findByPk(id);
            if (land) {
                res.status(200).json(land);
            } else {
                res.status(404).json({ error: 'Land not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch land' });
        }
    },
    
    updateLand: async (req, res) => {
        try {
            const { landId } = req.params;
            const {
                title, price, size, alt, long, purchaseoption, TerrainType, Zoning, isVerifie, viewOptions, accessOptions,media
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
