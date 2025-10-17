// routes/adminRoutes.js
import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getAllTutorials,
  deleteTutorial,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes below are admin-only
router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/tutorials', getAllTutorials);
router.delete('/tutorials/:id', deleteTutorial);

export default router;
