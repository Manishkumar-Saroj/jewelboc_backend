// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./src/config/database');
const passport = require('passport');
require('./src/config/passport.config');

// Import routes
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors({
  origin: [process.env.ADMIN_URL, process.env.FRONTEND_URL],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Add passport initialization before routes
app.use(passport.initialize());

// API Routes
const API_VERSION = '/api/v1';
app.use(`${API_VERSION}/admin/`, authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

// Test database connection before starting server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    await sequelize.sync();
    console.log('Database synchronized successfully.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API endpoints: ${BASE_URL}/api/v1/admin`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();