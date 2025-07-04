const express = require('express');
const router = express.Router();
const bilanController = require('../controllers/bilanController');
const auth = require('../middlewares/auth');

// Appliquer le middleware d'authentification à toutes les routes
router.use(auth);

// Routes pour les bilans
router.post('/', bilanController.createBilan);
router.get('/user/activities', bilanController.getUserActivities);
router.get('/user', bilanController.getUserBilans);
router.get('/user/:userId', bilanController.getUserBilansById);
router.get('/:id', bilanController.getBilanById);
router.put('/:id', bilanController.updateBilan);
router.post('/:id/validate', bilanController.validateBilan);
router.delete('/:id', bilanController.deleteBilan);

module.exports = router; 