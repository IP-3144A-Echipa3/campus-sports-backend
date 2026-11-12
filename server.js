require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const terenRoutes = require('./routes/terenRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/terenuri', terenRoutes);
app.use('/api/auth', authRoutes);
// TODO (Future Commits): app.use('/api/rezervari', rezervariRoutes);

const PORT = process.env.PORT || 3000;

// Test DB and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    // Use { force: false } to avoid dropping tables on restart
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error connecting to database:', err));