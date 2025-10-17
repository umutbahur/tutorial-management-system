import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";
import { validationResult } from 'express-validator';
import db from '../models/index.js';
const { User } = db;



// @desc Register user
// @route POST /api/users/register
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { username, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });


    const user = await User.create({ 
        username, 
        email, 
        password,
        role: role || 'user'
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Login user
// @route POST /api/users/login
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
      token: generateToken(user.id),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role, 
  },
      
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all users
// @route GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update user
// @route PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow user to update their own account (or admin)
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to update this user' });
    }

    const { username, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password; // hashing handled by model hook if set

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Delete user
// @route DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow user to delete their own account (or admin)
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this user' });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
