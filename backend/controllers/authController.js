const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Sequelize } = require("../models");
const crypto = require('crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailService');
const { Op } = Sequelize;
const { Profile } = require("../models");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

exports.register = async (req, res) => {
  try {
    const { 
      email, 
      password, 
      civility, 
      firstName, 
      lastName 
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      email,
      password,
      civility,
      firstName,
      lastName,
      verificationToken
    });

    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de vérification:', emailError);
    }

    res.status(201).json({ 
      message: 'Inscription réussie. Veuillez vérifier votre email pour activer votre compte.',
      user: {
        id: user.id,
        email: user.email,
        civility: user.civility,
        firstName: user.firstName,
        lastName: user.lastName,
        coach: user.coach,
        admin: user.admin
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Veuillez vérifier votre compte avant de vous connecter' });
    }

    const token = generateToken(user.id);
    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        civility: user.civility,
        firstName: user.firstName,
        lastName: user.lastName,
        coach: user.coach,
        admin: user.admin
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.status(400).json({ message: 'Token de vérification invalide' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    // Création du profil par défaut
    const profile = await Profile.create({
      userId: user.id,
      date_naissance: null,
      taille_cm: null,
      poids_kg: null,
      imc: null,
      adresse: null,
      complement_adresse: null,
      code_postal: null,
      ville: null,
      activite_professionnelle: null,
      secteur_activite: null,
      objectif_sportif_1: null,
      objectif_sportif_2: null,
      objectif_sportif_3: null,
      autre_objectif: null,
      niveau_activite_physique: null,
      habitude_tabac: false,
      habitude_alcool: false,
      sommeil: null,
      alimentation: null,
      nap: null,
      metabolisme_basal: null,
      metabolisme_total: null,
      commentaire: null
    });

    res.json({ 
      message: 'Email vérifié avec succès',
      profile: {
        id: profile.id,
        userId: profile.userId
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    res.status(500).json({ message: 'Erreur lors de la vérification de l\'email' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.json({ message: 'Instructions envoyées par email' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token de réinitialisation invalide ou expiré' });
    }

    // Cryptage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await Profile.destroy({ where: { userId } });

    await User.destroy({ where: { id: userId } });

    res.json({ message: 'Compte et données personnelles supprimés avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du compte' });
  }
};
