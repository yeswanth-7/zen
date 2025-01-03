const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonController');

router.get('/', carbonController.getCarbonData);
router.get('/:id', carbonController.getCarbonDataById);

module.exports = router;