// Require express.js
const express = require('express');

// Set value for port, both for local (3001) and process.env.port (use for Heroku)
const PORT = process.env.PORT || 3001;

// Require path functions
const path = require('path');

// Set app variable to express.js
const app = express();

// Middleware for JSON use
app.use(express.json());

//Middleware for URL encoding
app.use(express.urlencoded({ extended: true }));

// Middleware for using html public directory
app.use(express.static('public'));

// Require the 2 routes for api and html root
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middle ware to use routes for /api and / (root)
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Set port to listening when running the npm start command
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);