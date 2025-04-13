// Step 1: Load environment variables from .env file
require('dotenv').config(); // This will load variables from the .env file into process.env
console.log("JWT_SECRET:", process.env.JWT_SECRET);  // Check if it loads correctly

// Step 2: Import required packages
const express = require('express');        // Express framework
const mongoose = require('mongoose');      // Mongoose to interact with MongoDB
const cors = require('cors');              // CORS middleware to enable cross-origin requests
const cookieParser = require('cookie-parser');  // Cookie parser to handle cookies in requests

// Step 3: Create an Express application
const app = express();

// Step 4: Set up CORS to allow requests from the React frontend (running on http://localhost:3000)
const corsOptions = {
  origin: 'http://localhost:3000',   // React frontend URL
  credentials: true,                 // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Step 5: Middleware for parsing incoming JSON requests and cookies
app.use(express.json());            // Parse JSON request bodies
app.use(cookieParser());            // Parse cookies in requests

// Step 6: Connect to MongoDB using the MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Step 7: Define routes
app.use("/api/auth", require("./routes/authRoutes"));  // Routes for authentication

// Example root route for testing
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Step 8: Start the server
const PORT = process.env.PORT || 5000;  // Default to port 5000 if not specified in .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

