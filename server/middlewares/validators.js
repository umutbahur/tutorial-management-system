import { body } from 'express-validator';
import { generatePasswordValidator } from "../utils/generatePasswordValidator.js";

// User validation rules
export const registerValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  ...generatePasswordValidator(),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isStrongPassword({minLength: 6}).notEmpty().withMessage('Password is required'),
];

// Tutorial validation rules
export const tutorialValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('published').optional().isBoolean().withMessage('Published must be boolean'),
];
