const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Create a new employee
router.post('/employees', employeeController.createEmployee);

// Get employee by ID
router.get('/employees/:eid', employeeController.getEmployeeById);

// Update employee details by ID
router.put('/employees/:eid', employeeController.updateEmployee);

// Delete employee by ID
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;
