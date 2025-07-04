const express = require('express');
const router = express.Router();
const referencesController = require('../controllers/referencesController');
const auth = require('../middlewares/auth');

// Routes protégées par authentification
router.get('/heures-sommeil', auth, referencesController.getHeuresSommeilRefs);
router.get('/nb-repas', auth, referencesController.getNbRepasRefs);

module.exports = router; 