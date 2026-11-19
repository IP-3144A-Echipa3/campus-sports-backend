// JavaScript source code
const express = require('express');
const router = express.Router();
const utilizatorController = require('../controllers/utilizatorController');

router.post('/register', utilizatorController.registerUser);
router.get('/', utilizatorController.getAllUsers);
router.get('/:id', utilizatorController.getUserById);
router.put('/:id', utilizatorController.updateUser);
router.delete('/:id', utilizatorController.deleteUser);

module.exports = router;