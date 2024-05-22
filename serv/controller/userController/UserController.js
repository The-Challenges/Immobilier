const db = require('../../Model/index');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    const user = await db.User.create({ firstName, email, password: hashedPassword });
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
    // Make sure user.id or user.userId exists and is correctly named according to your user model
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: "1000h" });

    // Ensure the response includes all necessary user fields
    res.status(200).json({
      token,
      user: {
        userId: user.id,  // Adjusted to 'id' which is commonly used
        firstName: user.firstName,
        email: user.email
      }
    });
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


exports.insertAllUsers = async (req, res) => {
  try {
    const user = await db.User.bulkCreate(dummyUsers)
    res.status(200).json(user).send(user, "sucess")
  }
  catch (error) {
    console.log(error);
    console.error(error)

  }

}

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, email, oldPassword, newPassword, newPasswordConfirmation, phoneNumber, age, alt, long } = req.body;

  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the email is changing and if the new email is already in use
    if (email && email !== user.email) {
      const emailExists = await db.User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    let hashedPassword = user.password;
    // Check if the old password is correct and new passwords match before setting a new password
    if (oldPassword && newPassword && newPasswordConfirmation) {
      if (!await bcrypt.compare(oldPassword, user.password)) {
        return res.status(403).json({ message: "Incorrect old password" });
      }
      if (newPassword !== newPasswordConfirmation) {
        return res.status(400).json({ message: "New password and confirmation do not match" });
      }
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    // Update user data
    const updatedUser = await user.update({
      firstName: firstName || user.firstName,
      email: email || user.email,
      password: hashedPassword,
      phoneNumber: phoneNumber || user.phoneNumber,
      age: age || user.age,
      alt: alt || user.alt,
      long: long || user.long
    });
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user due to server error' });
  }
};