const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const recommendationController = require('../controllers/recommendationController');

router.get('/', authMiddleware, recommendationController.getRecommendations);

router.post('/track', authMiddleware, recommendationController.trackRecommendation);


module.exports = router;