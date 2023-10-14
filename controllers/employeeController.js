const Employee = require('../models/employeeModel');

// Get all employees
exports.getAllEmployees = (req, res) => {
  // Implement logic to fetch all employees from the database
  Employee.find({}, (err, employees) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error fetching employees',
      });
    }
    res.status(200).json(employees);
  });
};

// Create a new employee
exports.createEmployee = (req, res) => {
  const { first_name, last_name, email, gender, salary } = req.body;
  const newEmployee = new Employee({ first_name, last_name, email, gender, salary });

  // Implement logic to save the new employee to the database
  newEmployee.save((err, employee) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: 'Error creating employee',
      });
    }
    res.status(201).json(employee);
  });
};

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  const employeeId = req.params.eid;

  // Implement logic to fetch an employee by ID from the database
  Employee.findById(employeeId, (err, employee) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error fetching employee',
      });
    }
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found',
      });
    }
    res.status(200).json(employee);
  });
};

// Update employee details by ID
exports.updateEmployee = (req, res) => {
  const employeeId = req.params.eid;
  const updatedData = req.body;

  // Implement logic to update employee details by ID in the database
  Employee.findByIdAndUpdate(employeeId, updatedData, { new: true }, (err, updatedEmployee) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error updating employee',
      });
    }
    if (!updatedEmployee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found',
      });
    }
    res.status(200).json(updatedEmployee);
  });
};

// Delete employee by ID
exports.deleteEmployee = (req, res) => {
  const employeeId = req.query.eid;

  // Implement logic to delete an employee by ID from the database
  Employee.findByIdAndRemove(employeeId, (err) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error deleting employee',
      });
    }
    res.status(204).send();
  });
};
