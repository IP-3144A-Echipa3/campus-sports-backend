const express = require('express');
const router = express.Router();
const terenController = require('../controllers/terenController');

router.get('/', terenController.getTerenuri);
router.post('/', terenController.createTeren);
router.put('/:id', terenController.updateTeren); 
router.delete('/:id', terenController.deleteTeren); 

module.exports = router;