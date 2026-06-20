const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');

// Load ecosystem variables
dotenv.config();

const app = express();

// Request body JSON parsing middleware
app.use(express.json());

// Main Routing mount point
app.use('/books', bookRoutes);

// Centralized production-safe error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Cast errors handle malformed MongoDB ObjectIDs gracefully
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Resource matching that unique ID structure does not exist.' });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Establish database engine connection safely
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully.');
    app.listen(PORT, () => console.log(`Server executing seamlessly on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database server connection failed:', err.message);
    process.exit(1);
  });