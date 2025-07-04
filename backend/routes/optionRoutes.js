const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');
const { isAdmin } = require('../middlewares/roleMiddleware');
const auth = require('../middlewares/auth');

// Routes publiques
router.get('/professions', optionController.getProfessions);
router.get('/secteurs', optionController.getSecteurs);
router.get('/professions/:secteur', optionController.getProfessionsBySecteur);

// Route pour ajouter une nouvelle profession (utilisateurs authentifiés)
router.post('/professions', auth, optionController.addNewProfession);

// Routes admin
router.get('/', isAdmin, optionController.getAllOptions);
router.post('/', isAdmin, optionController.createOption);
router.put('/:id', isAdmin, optionController.updateOption);
router.delete('/:id', isAdmin, optionController.deleteOption);

module.exports = router; 