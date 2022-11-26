// Require Path funcitonality
const path = require('path');

// Set Router to be a router for express.js
const router = require('express').Router();

// GET Route for feedback page
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

// GET Route for all other page requests to / (root)
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// Export results
module.exports = router;