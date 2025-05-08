// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./router');
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cookieParser());
// Middleware
app.use(cors(
  // {
  //   origin: "https://florasense-frontend.vercel.app",
  //   credentials: true,
  // }
));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Use the router
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
    });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
