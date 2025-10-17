// controllers/adminController.js
import db from '../models/index.js';
const { User, Tutorial } = db;

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tutorials
export const getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.findAll({
      include: [
    {
      model: User,
      as: 'user', // 👈 this must match your alias in Tutorial.belongsTo(User, { as: 'user' })
      attributes: ['id', 'username', 'email', 'role'],
    },
    ],
      order: [['createdAt', 'DESC']],
    });
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tutorial
export const deleteTutorial = async (req, res) => {
  try {
    const { id } = req.params;
    const tutorial = await Tutorial.findByPk(id);
    if (!tutorial) return res.status(404).json({ message: 'Tutorial not found' });

    await tutorial.destroy();
    res.json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
