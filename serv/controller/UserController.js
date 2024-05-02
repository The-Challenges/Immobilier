const db = require('../Model/index');
const { sign } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, imageUrl } = req.body;
    const user = await db.User.create({ name, email, password, imageUrl });

    const token = jwt.sign({ id: user.id }, '8c4190aadbf13874d651bdc726710d37451570482a5cbe91053af0144143a80f', { expiresIn: '10000h' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email, password } });

    if (user) {
      const token = sign({ id: user.id });
      res.status(200).json({ user, token });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.User.findByPk(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users' });
  }
};
