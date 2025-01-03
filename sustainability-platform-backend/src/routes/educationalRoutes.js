const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const educationalController = require('../controllers/educationalController');
router.post('/', authMiddleware, educationalController.createEducationalResource);
router.get('/', educationalController.getEducationalResources);
router.get('/:id', educationalController.getEducationalResourceById);
router.put('/:id', authMiddleware, educationalController.updateEducationalResource);
router.delete('/:id', authMiddleware, educationalController.deleteEducationalResource);

module.exports = router;