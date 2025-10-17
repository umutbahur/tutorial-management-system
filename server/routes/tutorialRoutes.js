import express from 'express';
import {
  getTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getMyTutorials,
  getOneTutorial
} from '../controllers/tutorialController.js';
import { tutorialValidation } from '../middlewares/validators.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

//static protected
router.get('/my', protect, getMyTutorials);
// Public
router.get('/', getTutorials);
router.get('/:id', getOneTutorial);
// Protected
router.post('/', protect, tutorialValidation, createTutorial);
router.put('/:id', protect, tutorialValidation, updateTutorial);
router.delete('/:id', protect, deleteTutorial);

export default router;
