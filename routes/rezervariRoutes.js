const express = require('express');
const router = express.Router();
const rezervariController = require('../controllers/rezervariController');

router.get('/', rezervariController.getAllRezervari);
router.post('/', rezervariController.createRezervare);
router.put('/:id/status', rezervariController.updateRezervareStatus);
router.delete('/:id', rezervariController.deleteRezervare);

module.exports = router;