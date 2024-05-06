const db = require('../../Model/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dummyUsers = require('./Users.json')






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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const jwtSecret = process.env.JWT_SECRET; 
    const token = jwt.sign({ id: user.userId, role: user.role }, jwtSecret, { expiresIn: "1000h" });

    res.status(200).json({ token, user: { userId: user.userId, firstName: user.firstName, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed due to server error' });
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


exports.insertAllUsers = async(req,res)=>{
   try{
    const user = await db.User.bulkCreate(dummyUsers)
    res.status(200).json(user).send(user,"sucess")
   }
   catch (error){
      console.log(error);
      console.error(error)

   }

}
