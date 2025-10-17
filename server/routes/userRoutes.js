import express from 'express';
import { registerUser, loginUser, getUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { registerValidation, loginValidation } from '../middlewares/validators.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// Protected
router.get('/', protect, authorize('admin'), getUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;
