const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middlewares/auth');
const { isCoachOrAdmin } = require('../middlewares/roleMiddleware');

// Routes protégées par authentification
router.get('/', auth, profileController.getProfile);
router.get('/:userId', auth, isCoachOrAdmin, profileController.getProfileById);
router.put('/', auth, profileController.updateProfile);
router.delete('/', auth, profileController.deleteProfile);

module.exports = router; 