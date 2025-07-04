const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post("/register", [
  body('civility').isIn(['Monsieur', 'Madame', 'Autre']).withMessage('Civilité invalide'),
  body('firstName').isString().isLength({ min: 2 }).withMessage('Prénom invalide')
    .matches(/^[A-Za-zÀ-ÿ-]+$/).withMessage('Le prénom doit contenir uniquement des lettres'),
  body('lastName').isString().isLength({ min: 2 }).withMessage('Nom invalide')
    .matches(/^[A-Za-zÀ-ÿ-]+$/).withMessage('Le nom doit contenir uniquement des lettres'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
], authController.register);

router.post("/login", [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').exists().withMessage('Mot de passe requis')
], authController.login);

router.get('/verify-email/:token', authController.verifyEmail);

router.post('/forgot-password', [
  body('email').isEmail().withMessage('Email invalide')
], authController.forgotPassword);

router.post('/reset-password', [
  body('token').exists().withMessage('Token requis'),
  body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
], authController.resetPassword);

// Route protégée exemple
router.get('/profile', auth, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    civility: req.user.civility,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    coach: req.user.coach,
    admin: req.user.admin
  });
});

router.delete('/delete', auth, authController.deleteAccount);
module.exports = router;
