import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import tutorialRoutes from './routes/tutorialRoutes.js';
import passwordPolicyRoutes from "./routes/passwordPolicyRoutes.js";
import adminRoutes from './routes/adminRoutes.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tutorials', tutorialRoutes);
app.use("/api/password-policy", passwordPolicyRoutes);
app.use('/api/admin', adminRoutes);

// Error handler (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


export default app;