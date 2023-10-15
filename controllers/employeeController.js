const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
  try {
    // Retrieve all employees from the database
    const employees = await Employee.find();

    // Return the list of employees
    res.status(200).json(employees);
  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ status: false, message: 'Failed to retrieve employees' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    // Extract employee data from the request body
    const { first_name, last_name, email, gender, salary } = req.body;

    // Create a new employee
    const employee = new Employee({
      first_name,
      last_name,
      email,
      gender,
      salary,
    });

    // Save the employee to the database
    await employee.save();

    // Return a success response
    res.status(201).json({ status: true, message: 'Employee created successfully' });
  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ status: false, message: 'Employee creation failed' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.eid;

    // Find an employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      // Return an error response for not found
      res.status(404).json({ status: false, message: 'Employee not found' });
    } else {
      // Return the employee details
      res.status(200).json(employee);
    }
  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ status: false, message: 'Failed to retrieve employee details' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.eid;

    // Extract updated data from the request body
    const { first_name, last_name, email, gender, salary } = req.body;

    // Find and update the employee by ID
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        first_name,
        last_name,
        email,
        gender,
        salary,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      // Return an error response for not found
      res.status(404).json({ status: false, message: 'Employee not found' });
    } else {
      // Return the updated employee details
      res.status(200).json(updatedEmployee);
    }
  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ status: false, message: 'Failed to update employee details' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.query.eid;

    // Delete an employee by ID
    const result = await Employee.findByIdAndRemove(employeeId);

    if (!result) {
      // Return an error response for not found
      res.status(404).json({ status: false, message: 'Employee not found' });
    } else {
      // Return a success response
      res.status(204).send();
    }
  } catch (error) {
    // Handle errors and return an error response
    res.status(500).json({ status: false, message: 'Failed to delete employee' });
  }
};

