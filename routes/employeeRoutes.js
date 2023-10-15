const express = require('express');
const router = express.Router();
const empController = require('../controllers/empController');
const authenticate = require('../middlewares/auth'); // Import the authentication middleware

router.get('/employees', authenticate, empController.getAllEmployees);
router.post('/employees', authenticate, empController.createEmployee);
router.get('/employees/:eid', authenticate, empController.getEmployeeById);
router.put('/employees/:eid', authenticate, empController.updateEmployee);
router.delete('/employees', authenticate, empController.deleteEmployee);

module.exports = router;

