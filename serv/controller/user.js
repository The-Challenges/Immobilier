  const db = require('../Model/index');

  module.exports = {
    getAll: async (req, res) => {
      try {
        const result = await db.User.findAll();
        res.status(200).json(result);
      } catch (error) {
        throw error;
      }
    }
  };
