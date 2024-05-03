const db = require('../Model/index');
const { sign } = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
 // Updated field names

exports.signup = async (req, res) => {
  const { firstName, email, password } = req.body;

try {
const hashedPassword = await bcrypt.hash(password, 10);
const existingUser = await db.User.findOne({ where: { email } });
if (existingUser) {
  return res.status(409).json({ message: "Email is already registered" });
}
const user = await db.User.create({ firstName, email, password: hashedPassword});
res.status(201).json(user);
} catch (error) {
throw error
}
}

exports.login =async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({message:"Obligatorey of the email and the password"})
    }
    const user = await db.User.findOne({ where: { email } });
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const token = jwt.sign({ id: user.id , role:user.role }, "mlop09", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
   throw error
  }
},

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
