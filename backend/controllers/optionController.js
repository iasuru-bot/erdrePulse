const { Secteur, Profession, Sequelize, sequelize, Profile } = require('../models');
const { Op } = require('sequelize');

const optionController = {
  // Récupérer tous les secteurs
  getSecteurs: async (req, res) => {
    try {
      const secteurs = await Secteur.findAll({
        where: {
          active: true
        },
        order: [
          ['order', 'ASC'],
          ['label', 'ASC']
        ],
        attributes: ['value', 'label']
      });

      res.json(secteurs);
    } catch (error) {
      console.error('Erreur lors de la récupération des secteurs:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des secteurs' });
    }
  },

  // Récupérer toutes les professions
  getProfessions: async (req, res) => {
    try {
      const professions = await Profession.findAll({
        where: {
          active: true
        },
        order: [
          ['order', 'ASC'],
          ['label', 'ASC']
        ],
        attributes: ['value', 'label']
      });

      res.json(professions);
    } catch (error) {
      console.error('Erreur lors de la récupération des professions:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des professions' });
    }
  },

  // Récupérer les professions par secteur
  getProfessionsBySecteur: async (req, res) => {
    try {
      const { secteur } = req.params;
      
      // Si le secteur est 'autre', retourner toutes les professions
      if (secteur === 'autre') {
        const professions = await Profession.findAll({
          where: {
            active: true
          },
          order: [
            ['order', 'ASC'],
            ['label', 'ASC']
          ],
          attributes: ['value', 'label']
        });
        return res.json(professions);
      }

      // Sinon, trouver le secteur par sa valeur
      const secteurFound = await Secteur.findOne({
        where: {
          value: secteur,
          active: true
        }
      });

      if (!secteurFound) {
        return res.status(404).json({ message: 'Secteur non trouvé' });
      }

      // Trouver toutes les professions liées à ce secteur
      const professions = await Profession.findAll({
        include: [{
          model: Secteur,
          as: 'secteurs',
          through: { attributes: [] },
          where: { id: secteurFound.id }
        }],
        where: {
          active: true
        },
        order: [
          ['order', 'ASC'],
          ['label', 'ASC']
        ],
        attributes: ['value', 'label']
      });

      res.json(professions);
    } catch (error) {
      console.error('Erreur lors de la récupération des professions:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des professions' });
    }
  },

  // Récupérer tous les secteurs et professions (admin)
  getAllOptions: async (req, res) => {
    try {
      const [secteurs, professions] = await Promise.all([
        Secteur.findAll({
          order: [
            ['order', 'ASC'],
            ['label', 'ASC']
          ]
        }),
        Profession.findAll({
          order: [
            ['order', 'ASC'],
            ['label', 'ASC']
          ]
        })
      ]);

      res.json({
        secteurs,
        professions
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des données' });
    }
  },

  // Créer un nouveau secteur ou une nouvelle profession (admin)
  createOption: async (req, res) => {
    try {
      const { type, value, label, order } = req.body;

      if (!['secteur', 'profession'].includes(type)) {
        return res.status(400).json({ message: 'Type invalide. Doit être "secteur" ou "profession"' });
      }

      const Model = type === 'secteur' ? Secteur : Profession;
      const option = await Model.create({
        value,
        label,
        order: order || 0
      });

      res.status(201).json(option);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      res.status(500).json({ message: 'Erreur lors de la création' });
    }
  },

  // Mettre à jour un secteur ou une profession (admin)
  updateOption: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, label, order, active } = req.body;

      if (!['secteur', 'profession'].includes(type)) {
        return res.status(400).json({ message: 'Type invalide. Doit être "secteur" ou "profession"' });
      }

      const Model = type === 'secteur' ? Secteur : Profession;
      const option = await Model.findByPk(id);
      
      if (!option) {
        return res.status(404).json({ message: `${type === 'secteur' ? 'Secteur' : 'Profession'} non trouvé(e)` });
      }

      await option.update({
        label,
        order,
        active
      });

      res.json(option);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour' });
    }
  },

  // Supprimer un secteur ou une profession (admin)
  deleteOption: async (req, res) => {
    try {
      const { id } = req.params;
      const { type } = req.query;

      if (!['secteur', 'profession'].includes(type)) {
        return res.status(400).json({ message: 'Type invalide. Doit être "secteur" ou "profession"' });
      }

      const Model = type === 'secteur' ? Secteur : Profession;
      const option = await Model.findByPk(id);
      
      if (!option) {
        return res.status(404).json({ message: `${type === 'secteur' ? 'Secteur' : 'Profession'} non trouvé(e)` });
      }

      await option.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
  },

  // Ajouter une nouvelle profession (pour les utilisateurs authentifiés)
  addNewProfession: async (req, res) => {
    try {
      const { profession, secteur } = req.body;
      const userId = req.user.id;

      if (!profession) {
        console.error('Erreur: profession manquante dans le body');
        return res.status(400).json({ message: 'La profession est requise' });
      }

      // Vérifier si la profession existe déjà
      const existingProfession = await Profession.findOne({
        where: {
          [Op.or]: [
            { value: profession.toLowerCase().replace(/\s+/g, '_') },
            { label: profession }
          ]
        }
      });

      if (existingProfession) {
        // Si la profession existe déjà, on l'utilise pour mettre à jour le profil
        const professionValue = existingProfession.value;
        
        // Déterminer le secteur à utiliser
        let secteurToUse = secteur || 'autre';
        
        // Mettre à jour le profil de l'utilisateur
        const [updatedRows] = await Profile.update(
          { 
            activite_professionnelle: professionValue,
            secteur_activite: secteurToUse
          },
          { where: { userId } }
        );

        return res.status(200).json({
          value: existingProfession.value,
          label: existingProfession.label,
          message: 'Profession existante appliquée au profil'
        });
      }

      // Créer la nouvelle profession
      const newProfession = await Profession.create({
        value: profession.toLowerCase().replace(/\s+/g, '_'),
        label: profession,
        active: true,
        order: 0 // Par défaut à la fin de la liste
      });

      // Si un secteur est spécifié et qu'il n'est pas "autre", créer la relation
      if (secteur && secteur !== 'autre') {
        const secteurFound = await Secteur.findOne({
          where: { value: secteur }
        });
        
        if (secteurFound) {
          // Créer la relation entre la profession et le secteur
          await newProfession.addSecteur(secteurFound);
        }
      }

      // Déterminer le secteur à utiliser pour le profil
      let secteurToUse = secteur || 'autre';
      
      // Mettre à jour le profil de l'utilisateur
      const [updatedRows] = await Profile.update(
        { 
          activite_professionnelle: newProfession.value,
          secteur_activite: secteurToUse
        },
        { where: { userId } }
      );
      
      res.status(201).json({
        value: newProfession.value,
        label: newProfession.label,
        message: 'Nouvelle profession créée et appliquée au profil'
      });
    } catch (error) {
      console.error('=== ERREUR dans addNewProfession ===');
      console.error('Erreur détaillée:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ 
        message: 'Erreur lors de l\'ajout de la profession',
        error: error.message,
        stack: error.stack
      });
    }
  }
};

module.exports = optionController; 