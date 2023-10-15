const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import the JWT library


mongoose.connect('mongodb://localhost:27017/COMP3123_Assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/employee', require('./routes/employeeRoutes'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
