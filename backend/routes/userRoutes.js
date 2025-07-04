const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { isCoachOrAdmin } = require('../middlewares/roleMiddleware');

// Routes protégées pour les coachs et admins
router.use(auth);
router.use(isCoachOrAdmin);

// Récupérer tous les utilisateurs (sauf admins)
router.get('/', userController.getAllUsers);

// Rechercher des utilisateurs
router.get('/search', userController.searchUsers);

// Récupérer un utilisateur spécifique
router.get('/:id', userController.getUserById);

// Mettre à jour le rôle d'un utilisateur (admin uniquement)
router.put('/:id/role', userController.updateUserRole);

// Retirer le rôle d'un utilisateur (admin uniquement)
router.put('/:id/remove-role', userController.removeUserRole);

module.exports = router; 