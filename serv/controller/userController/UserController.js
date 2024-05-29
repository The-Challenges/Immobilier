const db = require('../../Model/index');
const media = require('../../Model/media');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    signup: async (req, res) => {
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
            console.error(error);
            res.status(500).json({ message: 'Signup failed due to server error' });
        }
    },

    login: async (req, res) => {
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
            const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: "1000h" });

            res.status(200).json({
                token,
                user: {
                    userId: user.id,
                    firstName: user.firstName,
                    email: user.email
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Login failed due to server error' });
        }
    },
    getUser: async (req, res) => {
      try {
          const userId = req.params.id; // Use req.params.id to get the ID from the URL
          const user = await db.User.findByPk(userId,{
            include:db.Media
          });

          if (user) {
              res.status(200).json(user);
          } else {
              res.status(404).json({ error: 'User not found' });
          }
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to get user' });
      }
  },
  
   getUserId : async () => {
    try {
        const userData = await storage.load({ key: 'loginState' });
        return userData.user.userId;
    } catch (error) {
        console.error('Failed to retrieve user data:', error);
        return null;
    }
},
    getAllUsers: async (req, res) => {
        try {
            const users = await db.User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to get users' });
        }
    },

    insertAllUsers: async (req, res) => {
        try {
            const user = await db.User.bulkCreate(dummyUsers);
            res.status(200).json({ success: true, message: "Users added successfully", data: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to add users", error: error.message });
        }
    },
     updateUser: async (req, res) => {
      const { id } = req.params;
      const { firstName, email, oldPassword, newPassword, newPasswordConfirmation, phoneNumber, age, media } = req.body;
  
      try {
          // Find the user by ID
          const user = await db.User.findByPk(id);
          if (!user) {
              return res.status(404).json({ message: "User not found" });
          }
  
          // Check if the email is changing and if the new email already exists
          if (email && email !== user.email) {
              const emailExists = await db.User.findOne({ where: { email } });
              if (emailExists) {
                  return res.status(409).json({ message: "Email already in use" });
              }
          }
  
          // Handle password change
          let hashedPassword = user.password;
          if (oldPassword && newPassword && newPasswordConfirmation) {
              if (!await bcrypt.compare(oldPassword, user.password)) {
                  return res.status(403).json({ message: "Incorrect old password" });
              }
              if (newPassword !== newPasswordConfirmation) {
                  return res.status(400).json({ message: "New password and confirmation do not match" });
              }
              hashedPassword = await bcrypt.hash(newPassword, 10);
          }
  
          // Update the user details
          await user.update({
              firstName: firstName || user.firstName,
              email: email || user.email,
              password: hashedPassword,
              phoneNumber: phoneNumber || user.phoneNumber,
              age: age || user.age,
          });
  
          // Update or create media link
          const existingMedia = await db.Media.findOne({ where: { userId: user.id } });
          if (existingMedia) {
              await existingMedia.update({ link: media });
          } else {
              await db.Media.create({ link: media, userId: user.id });
          }
  
          res.status(200).json({ message: 'User updated successfully', user });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to update user due to server error' });
      }
  },
  getUserPosts: async (req, res) => {
    const userId = req.params.userId;
    try {
        const houses = await db.House.findAll({ 
            where: { userId },
            include: [db.Media, db.Indoor, db.Climate, db.Outdoor, db.View] 
        });
        const lands = await db.Land.findAll({ 
            where: { userId },
            include: [db.Media] 
        });

        res.status(200).json({ houses, lands });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'Failed to fetch user posts' });
    }
}
};
