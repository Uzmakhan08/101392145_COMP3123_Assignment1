const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key
exports.signup = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Create a new user
    const user = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Return a success response
    res.status(201).json({ status: true, message: 'User registered successfully' });
  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ status: false, message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username and password
    const user = await User.findOne({ username, password });

    if (!user) {
      // Return an error response for invalid credentials
      res.status(401).json({ status: false, message: 'Invalid Username and password' });
    } else {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); // Expires in 1 hour

      // Return a success response with the JWT token
      res.status(200).json({ status: true, username: user.username, message: 'User logged in successfully', jwt_token: token });
    }
  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ status: false, message: 'Login failed' });
  }
};