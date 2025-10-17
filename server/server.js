import app from './app.js';
import  db  from './models/index.js';

const PORT = process.env.PORT || 5000;

// Test DB connection & start server
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected...');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ DB connection error:', err));
