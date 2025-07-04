const { Bilan, BilanSanteVie, BilanTestsPhysiques, Objectif, Activite, User, NbHeuresSommeilRef, NbRepasRef, Profile } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../models');


// Fonction pour mettre à jour le profil utilisateur
const updateUserProfile = async (userId, informations) => {
  const userProfile = await Profile.findOne({
    where: { userId: userId }
  });

  if (!userProfile) {
    return null;
  }

  const updates = {};
  
  if (informations.taille !== userProfile.taille_cm) {
    updates.taille_cm = informations.taille;
  }
  if (informations.poids !== userProfile.poids_kg) {
    updates.poids_kg = informations.poids;
  }
  if (informations.imc !== userProfile.imc) {
    updates.imc = informations.imc;
  }
  if (informations.adresse && informations.adresse !== userProfile.adresse) {
    updates.adresse = informations.adresse;
  }
  if (informations.complement_adresse && informations.complement_adresse !== userProfile.complement_adresse) {
    updates.complement_adresse = informations.complement_adresse;
  }
  if (informations.code_postal && informations.code_postal !== userProfile.code_postal) {
    updates.code_postal = informations.code_postal;
  }
  if (informations.ville && informations.ville !== userProfile.ville) {
    updates.ville = informations.ville;
  }
  if (informations.activite_professionnelle && informations.activite_professionnelle !== userProfile.activite_professionnelle) {
    updates.activite_professionnelle = informations.activite_professionnelle;
  }
  if (informations.secteur_activite && informations.secteur_activite !== userProfile.secteur_activite) {
    updates.secteur_activite = informations.secteur_activite;
  }
  if (informations.date_naissance && informations.date_naissance !== userProfile.date_naissance) {
    updates.date_naissance = informations.date_naissance;
  }

  if (Object.keys(updates).length > 0) {
    await userProfile.update(updates);
    return userProfile;
  }

  return userProfile;
};

// Fonction pour créer et lier les objectifs au bilan
const createAndLinkObjectifs = async (bilanId, objectifs) => {
  
  if (!objectifs || objectifs.length === 0 || !bilanId) {
    return [];
  }

  const createdObjectifs = await Promise.all(objectifs.map(async (objectif) => {
    try {
      // Vérifier si l'objectif existe déjà
      const existingObjectif = await Objectif.findOne({
        where: {
          titre: objectif.titre,
          description: objectif.description
        }
      });

      let objectifId;
      if (existingObjectif !== null) {
        objectifId = existingObjectif.id;
      } else {
        // Créer un nouvel objectif s'il n'existe pas
        const newObjectif = await Objectif.create({
          titre: objectif.titre,
          description: objectif.description || ''
        });
        objectifId = newObjectif.id;
      }

      // Créer la liaison dans la table BilanObjectifs
      await sequelize.models.BilanObjectifs.create({
        bilan_id: bilanId,
        objectif_id: objectifId
      });

      return objectifId;
    } catch (error) {
      console.error('Erreur lors de la création/liaison de l\'objectif:', error);
      throw error;
    }
  }));

  return createdObjectifs;
};

// Fonction pour créer et lier les activités au bilan
const createAndLinkActivites = async (bilanId, activites) => {
  
  if (!activites || activites.length === 0 || !bilanId) {
    return [];
  }

  const createdActivites = await Promise.all(activites.map(async (activite) => {
    try {
      // Vérifier si l'activité existe déjà
      const existingActivite = await Activite.findOne({
        where: {
          type: activite.type,
          
        }
      });

      let activiteId;
      if (existingActivite) {
        activiteId = existingActivite.id;
      } else {
        // Créer une nouvelle activité si elle n'existe pas
        const newActivite = await Activite.create({
          type: activite.type,
        });
        activiteId = newActivite.id;
      }

      // Créer la liaison avec les informations spécifiques
      const liaisonData = {
        bilan_id: bilanId,
        activite_id: activiteId,
        frequence: activite.frequence,
        estOptionnelle: activite.estOptionnelle || false
      };
      await sequelize.models.BilanActivites.create(liaisonData);

      return activiteId;
    } catch (error) {
      console.error('Erreur lors de la création/liaison de l\'activité:', error);
      throw error;
    }
  }));

  return createdActivites;
};

// Fonction pour créer ou récupérer une référence de sommeil
const getOrCreateSommeilRef = async (label) => {
  try {
    const existingRef = await NbHeuresSommeilRef.findOne({
      where: { label: label }
    });

    if (existingRef) {
      return existingRef.id;
    }

    const newRef = await NbHeuresSommeilRef.create({
      label: label
    });
    return newRef.id;
  } catch (error) {
    console.error('Erreur lors de la création/récupération de la référence sommeil:', error);
    throw error;
  }
};

// Fonction pour créer ou récupérer une référence de repas
const getOrCreateRepasRef = async (label) => {
  try {
    const existingRef = await NbRepasRef.findOne({
      where: { label: label }
    });

    if (existingRef) {
      return existingRef.id;
    }

    const newRef = await NbRepasRef.create({
      label: label
    });
    return newRef.id;
  } catch (error) {
    console.error('Erreur lors de la création/récupération de la référence repas:', error);
    throw error;
  }
};

// Fonction pour créer le BilanSanteVie
const createBilanSanteVie = async (bilanId, data) => {
  if (!data || !bilanId) {
    return null;
  }

  try {
    // Créer ou récupérer les références
    const nbHeuresSommeilId = data.sommeil?.nb_heures_sommeil ? 
      await getOrCreateSommeilRef(data.sommeil.nb_heures_sommeil) : null;
    
    const nbRepasId = data.sommeil?.nb_repas ? 
      await getOrCreateRepasRef(data.sommeil.nb_repas) : null;

    const bilanSanteVie = await BilanSanteVie.create({
      bilan_id: bilanId,
      // Antécédents
      antecedents_medicaux: data.antecedents?.antecedents_medicaux || false,
      antecedents_medicaux_precisions: data.antecedents?.antecedents_medicaux_precisions,
      operations_accidents: data.antecedents?.operations_accidents || false,
      operations_accidents_precisions: data.antecedents?.operations_accidents_precisions,
      traitements_actuels: data.antecedents?.traitements_actuels || false,
      traitements_actuels_precisions: data.antecedents?.traitements_actuels_precisions,
      // Symptômes
      douleurs_thoraciques: data.symptomes?.douleurs_thoraciques || false,
      douleurs_thoraciques_precisions: data.symptomes?.douleurs_thoraciques_precisions,
      douleurs_chroniques: data.symptomes?.douleurs_chroniques || false,
      douleurs_chroniques_precisions: data.symptomes?.douleurs_chroniques_precisions,
      // Habitudes
      fumeur: data.habitudes?.fumeur || false,
      consommation_alcool: data.habitudes?.consommation_alcool || false,
      alcool_indicateur: data.habitudes?.alcool_indicateur,
      heures_alcool_semaine: data.habitudes?.heures_alcool_semaine,
      // Sommeil et repas
      nb_heures_sommeil_id: nbHeuresSommeilId,
      nb_repas_id: nbRepasId,
      petit_dejeuner: data.sommeil?.petit_dejeuner,
      collation: data.sommeil?.collation || false,
      collation_details: data.sommeil?.collation_details
    });

    return bilanSanteVie;
  } catch (error) {
    console.error('Erreur lors de la création du BilanSanteVie:', error);
    throw error;
  }
};

// Fonction pour créer le BilanTestsPhysiques
const createBilanTestsPhysiques = async (bilanId, testsphysiques, testequilibre, testsouplesse, testforceinf, testforcesup, testendurance, testvma, fatigue1, fatigue2) => {
  if (!testsphysiques || !testequilibre || !testsouplesse || !testforceinf || !testforcesup || !testendurance || !testvma || !fatigue1 || !fatigue2 || !bilanId) {
    return null;
  }

  try {
    const bilanTestsPhysiques = await BilanTestsPhysiques.create({
      bilan_id: bilanId,
      test_effort_6_mois: testsphysiques.test_effort_6_mois || false,
      test_effort_commentaire: testsphysiques.test_effort_commentaire,
      test_equilibre_1: testequilibre.test_equilibre_1, 
      test_equilibre_2: testequilibre.test_equilibre_2,
      test_equilibre_resultat: testequilibre.test_equilibre_resultat,
      test_equilibre_commentaire: testequilibre.test_equilibre_commentaire,
      test_equilibre_conseil: testequilibre.test_equilibre_conseil,
      test_souplesse_resultat: testsouplesse.test_souplesse_resultat,
      test_souplesse_commentaire: testsouplesse.test_souplesse_commentaire,
      test_souplesse_conseil: testsouplesse.test_souplesse_conseil,
      test_force_inf_resultat: testforceinf.test_force_inf_resultat,
      test_force_inf_commentaire: testforceinf.test_force_inf_commentaire,
      test_force_inf_conseil: testforceinf.test_force_inf_conseil,
      test_force_sup_resultat: testforcesup.test_force_sup_resultat,
      test_force_sup_commentaire: testforcesup.test_force_sup_commentaire,
      test_force_sup_conseil: testforcesup.test_force_sup_conseil,
      test_endurance_resultat: testendurance.test_endurance_resultat,
      test_endurance_lbn: testendurance.test_endurance_lbn,
      test_endurance_commentaire: testendurance.test_endurance_commentaire,
      test_endurance_conseil: testendurance.test_endurance_conseil,
      test_vma_resultat: testvma.test_vma_resultat,
      test_vma_vo2max: testvma.test_vma_vo2max,
      test_vma_commentaire: testvma.test_vma_commentaire,
      test_vma_conseil: testvma.test_vma_conseil,
      fatigue_equilibre: fatigue1.fatigue_equilibre,
      fatigue_souplesse: fatigue1.fatigue_souplesse,
      fatigue_force_inf: fatigue1.fatigue_force_inf,
      fatigue_force_sup: fatigue2.fatigue_force_sup,
      fatigue_endurance: fatigue2.fatigue_endurance,
      fatigue_vma: fatigue2.fatigue_vma,
      fatigue_commentaire: fatigue2.fatigue_commentaire
    });

    return bilanTestsPhysiques;
  } catch (error) {
    console.error('Erreur lors de la création du BilanTestsPhysiques:', error);
    throw error;
  }
};

exports.createBilan = async (req, res) => {
  try {
    const {
      informations,
      metabasal,
      objectifs,
      activites,
      antecedents,
      symptomes,
      habitudes,
      sommeil,
      testsphysiques,
      testequilibre,
      testsouplesse,
      testforceinf,
      testforcesup,
      testendurance,
      testvma,
      fatigue1,
      fatigue2,
      commentaire_activites
    } = req.body;

    // Get necessary data for BMR calculation
    const tailleCm = informations.taille;
    const poidsKg = informations.poids;
    const ageYears = informations.age;
    const sexeCivility = informations.civility; // "Monsieur", "Madame", "Autre"

    let sexeForCalculation = "Autre";
    if (sexeCivility === "Monsieur") {
      sexeForCalculation = "Homme";
    } else if (sexeCivility === "Madame") {
      sexeForCalculation = "Femme";
    }

    let calculatedMb = 0;
    if (poidsKg && tailleCm && ageYears !== undefined && sexeForCalculation) {
      if (sexeForCalculation === "Homme") {
        // Standard Harris-Benedict for Men
        calculatedMb = 66.5 + (13.75 * poidsKg) + (5.003 * tailleCm) - (6.755 * ageYears);
      } else if (sexeForCalculation === "Femme") {
        // Standard Harris-Benedict for Women
        calculatedMb = 655.1 + (9.563 * poidsKg) + (1.850 * tailleCm) - (4.676 * ageYears);
      } else {
        // Fallback for "Autre" or if sexe is not explicitly "Homme" or "Femme"
        // Use male formula as a general default
        calculatedMb = 66.5 + (13.75 * poidsKg) + (5.003 * tailleCm) - (6.755 * ageYears);
      }
    }
    calculatedMb = Math.round(calculatedMb);

    let calculatedMt = 0;
    if (calculatedMb && metabasal.nap) {
      calculatedMt = Math.round(calculatedMb * metabasal.nap);
    }

    // Mettre à jour le profil de l'utilisateur
    // On fusionne les champs personnalisés si besoin
    let informationsToUpdate = { ...informations };
    if (req.body.informationsProfessionnelles) {
      if (req.body.informationsProfessionnelles.secteur_activite) {
        informationsToUpdate.secteur_activite = req.body.informationsProfessionnelles.secteur_activite;
      }
      if (req.body.informationsProfessionnelles.profession) {
        informationsToUpdate.activite_professionnelle = req.body.informationsProfessionnelles.profession;
      }
      // Si un secteur personnalisé a été saisi
      if (req.body.informationsProfessionnelles.autre_secteur) {
        informationsToUpdate.secteur_activite = req.body.informationsProfessionnelles.autre_secteur;
      }
      // Si une profession personnalisée a été saisie
      if (req.body.informationsProfessionnelles.autre_profession) {
        informationsToUpdate.activite_professionnelle = req.body.informationsProfessionnelles.autre_profession;
      }
    }
    await updateUserProfile(req.body.clientId, informationsToUpdate);

    // Créer le bilan principal
    const bilan = await Bilan.create({
      date: new Date(),
      taille: informations.taille,
      poids: informations.poids,
      imc: informations.imc,
      niveau_activite_physique: informations.activite,
      nap: metabasal.nap,
      commentaire_global: commentaire_activites || "",
      userId: req.user.id,
      clientId: req.body.clientId,
      interpretation_imc: informations.interpretation,
      commentaire_metabolisme: metabasal.commentaire_metabolisme,
      metabolisme_basal: calculatedMb, // Use calculated value
      metabolisme_total: calculatedMt // Use calculated value
    });

    // Créer et lier les objectifs
    if (objectifs && objectifs.length > 0) {
      await createAndLinkObjectifs(bilan.id, objectifs);
    }

    // Créer et lier les activités
    if (activites && activites.length > 0) {
      await createAndLinkActivites(bilan.id, activites);
    }

    // Créer le BilanSanteVie
    await createBilanSanteVie(bilan.id, {
      antecedents,
      symptomes,
      habitudes,
      sommeil
    });

    // Créer le BilanTestsPhysiques
    await createBilanTestsPhysiques(
      bilan.id,
      testsphysiques,
      testequilibre,
      testsouplesse,
      testforceinf,
      testforcesup,
      testendurance,
      testvma,
      fatigue1,
      fatigue2
    );

    res.status(201).json(bilan);
  } catch (error) {
    console.error('Erreur lors de la création du bilan:', error);
    res.status(500).json({ message: 'Erreur lors de la création du bilan', error: error.message });
  }
};

// Récupérer un bilan par son ID
exports.getBilanById = async (req, res) => {
  try {
    const bilanId = parseInt(req.params.id);
    if (isNaN(bilanId)) {
      console.error('ID de bilan invalide:', req.params.id);
      return res.status(400).json({ message: 'ID de bilan invalide' });
    }


    const bilan = await Bilan.findByPk(bilanId, {
      include: [
        {
          model: BilanSanteVie,
          as: 'santeVie',
          include: [
            { model: NbHeuresSommeilRef, as: 'nbHeuresSommeilRef', attributes: ['id', 'label'] },
            { model: NbRepasRef, as: 'nbRepasRef', attributes: ['id', 'label'] }
          ]
        },
        { model: BilanTestsPhysiques, as: 'testsPhysiques' },
        { model: Objectif, as: 'objectifs' },
        { model: Activite, as: 'activites' },
        { model: User, as: 'coach', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: User, as: 'client', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });

    if (!bilan) {
      console.error('Bilan non trouvé:', bilanId);
      return res.status(404).json({ message: 'Bilan non trouvé' });
    }

    // Vérification des droits d'accès
    if (req.user.id !== bilan.userId && req.user.id !== bilan.clientId) {
      console.error('Accès non autorisé au bilan:', {
        bilanId,
        userId: req.user.id,
        bilanCoachId: bilan.userId,
        bilanClientId: bilan.clientId
      });
      return res.status(403).json({ 
        message: 'Accès non autorisé',
        details: 'Vous n\'êtes ni le coach ni le client de ce bilan'
      });
    }

    res.json(bilan);
  } catch (error) {
    console.error('Erreur lors de la récupération du bilan:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du bilan',
      details: error.message
    });
  }
};

// Mettre à jour un bilan
exports.updateBilan = async (req, res) => {
  try {
    const bilan = await Bilan.findByPk(req.params.id);

    if (!bilan) {
      return res.status(404).json({ message: 'Bilan non trouvé' });
    }

    // Vérifier si l'utilisateur est le coach
    if (bilan.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const {
      date,
      taille,
      poids,
      niveau_activite_physique,
      nap,
      commentaire_global,
      objectifs,
      activites,
      santeVie,
      testsPhysiques
    } = req.body;

    // Mettre à jour le bilan
    await bilan.update({
      date,
      taille,
      poids,
      niveau_activite_physique,
      nap,
      commentaire_global
    });

    // Mettre à jour les objectifs
    if (objectifs) {
      await Objectif.destroy({ where: { bilan_id: bilan.id } });
      await Promise.all(objectifs.map(objectif =>
        Objectif.create({
          ...objectif,
          bilan_id: bilan.id
        })
      ));
    }

    // Mettre à jour les activités
    if (activites) {
      await Activite.destroy({ where: { bilan_id: bilan.id } });
      await Promise.all(activites.map(activite =>
        Activite.create({
          ...activite,
          bilan_id: bilan.id
        })
      ));
    }

    // Mettre à jour les informations de santé et vie
    if (santeVie) {
      await BilanSanteVie.update(santeVie, {
        where: { bilan_id: bilan.id }
      });
    }

    // Mettre à jour les tests physiques
    if (testsPhysiques) {
      await BilanTestsPhysiques.update(testsPhysiques, {
        where: { bilan_id: bilan.id }
      });
    }

    // Récupérer le bilan mis à jour
    const bilanMisAJour = await Bilan.findByPk(bilan.id, {
      include: [
        { model: Objectif, as: 'objectifs' },
        { model: Activite, as: 'activites' },
        { model: BilanSanteVie, as: 'santeVie' },
        { model: BilanTestsPhysiques, as: 'testsPhysiques' },
        { model: User, as: 'coach' },
        { model: User, as: 'client' }
      ]
    });

    res.json(bilanMisAJour);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du bilan:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du bilan', error: error.message });
  }
};

// Valider un bilan
exports.validateBilan = async (req, res) => {
  try {
    const bilan = await Bilan.findByPk(req.params.id);

    if (!bilan) {
      return res.status(404).json({ message: 'Bilan non trouvé' });
    }

    // Vérifier si l'utilisateur est le coach
    if (bilan.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Vérifier si toutes les sections sont remplies
    const santeVie = await BilanSanteVie.findOne({ where: { bilan_id: bilan.id } });
    const testsPhysiques = await BilanTestsPhysiques.findOne({ where: { bilan_id: bilan.id } });
    const objectifs = await Objectif.findAll({ where: { bilan_id: bilan.id } });
    const activites = await Activite.findAll({ where: { bilan_id: bilan.id } });

    if (!santeVie || !testsPhysiques || objectifs.length === 0 || activites.length === 0) {
      return res.status(400).json({ message: 'Toutes les sections du bilan doivent être remplies avant validation' });
    }

    // Mettre à jour le statut
    await bilan.update({ status: 'validated' });

    res.json({ message: 'Bilan validé avec succès', bilan });
  } catch (error) {
    console.error('Erreur lors de la validation du bilan:', error);
    res.status(500).json({ message: 'Erreur lors de la validation du bilan', error: error.message });
  }
};

// Récupérer tous les bilans d'un utilisateur
exports.getUserBilans = async (req, res) => {
  try {
    const bilans = await Bilan.findAll({
      where: {
        [Op.or]: [
          { userId: req.user.id }, // Bilans créés par le coach
          { clientId: req.user.id } // Bilans du client
        ]
      },
      include: [
        { model: Objectif, as: 'objectifs' },
        { model: Activite, as: 'activites' },
        { model: BilanSanteVie, as: 'santeVie' },
        { model: BilanTestsPhysiques, as: 'testsPhysiques' },
        { model: User, as: 'coach' },
        { model: User, as: 'client' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(bilans);
  } catch (error) {
    console.error('Erreur lors de la récupération des bilans:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des bilans', error: error.message });
  }
};

exports.getUserBilansById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Vérifier si l'utilisateur connecté a le droit d'accéder aux bilans
    if (req.user.id !== parseInt(userId) && !req.user.coach) {
      console.error('Accès non autorisé aux bilans:', {
        requestedUserId: userId,
        connectedUserId: req.user.id,
        isCoach: req.user.coach
      });
      return res.status(403).json({ 
        message: 'Accès non autorisé',
        details: 'Vous n\'avez pas les droits pour accéder à ces bilans'
      });
    }

    const bilans = await Bilan.findAll({
      where: {
        [Op.or]: [
          { userId: userId }, // Bilans créés par le coach
          { clientId: userId } // Bilans du client
        ]
      },
      include: [
        {
          model: BilanSanteVie,
          as: 'santeVie'
        },
        {
          model: BilanTestsPhysiques,
          as: 'testsPhysiques'
        },
        {
          model: Objectif,
          as: 'objectifs',
          through: { attributes: [] }
        },
        {
          model: Activite,
          as: 'activites',
          through: { attributes: ['frequence', 'estOptionnelle'] }
        },
        {
          model: User,
          as: 'coach',
          attributes: ['id', 'firstName', 'lastName', 'email']
        },
        {
          model: User,
          as: 'client',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    if (!bilans || bilans.length === 0) {
      return res.status(404).json({ message: 'Aucun bilan trouvé pour cet utilisateur' });
    }

    res.json(bilans);
  } catch (error) {
    console.error('Erreur lors de la récupération des bilans:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des bilans', error: error.message });
  }
};

// Supprimer un bilan
exports.deleteBilan = async (req, res) => {
  try {
    const bilan = await Bilan.findByPk(req.params.id);

    if (!bilan) {
      return res.status(404).json({ message: 'Bilan non trouvé' });
    }

    // Vérifier si l'utilisateur est le coach
    if (bilan.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    // Supprimer les relations
    await Objectif.destroy({ where: { bilan_id: bilan.id } });
    await Activite.destroy({ where: { bilan_id: bilan.id } });
    await BilanSanteVie.destroy({ where: { bilan_id: bilan.id } });
    await BilanTestsPhysiques.destroy({ where: { bilan_id: bilan.id } });

    // Supprimer le bilan
    await bilan.destroy();

    res.json({ message: 'Bilan supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du bilan:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du bilan', error: error.message });
  }
};

exports.getUserActivities = async (req, res) => {
  try {
    // On récupère le dernier bilan validé du client connecté
    const bilan = await Bilan.findOne({
      where: {
        clientId: req.user.id,
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Activite,
          as: 'activites',
          through: { attributes: ['frequence', 'estOptionnelle'] }
        }
      ]
    });

    if (!bilan) {
      return res.status(404).json({ message: 'Aucun bilan validé trouvé pour cet utilisateur.' });
    }

    // On formate la réponse pour le dashboard
    const activities = bilan.activites.map(act => ({
      name: act.type,
      frequency: act.BilanActivites.frequence,
      isOptional: act.BilanActivites.estOptionnelle
    }));

    res.json({
      user: req.user.firstName || req.user.lastName || 'Utilisateur',
      activities
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des activités:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des activités', error: error.message });
  }
}; 