'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Création des secteurs
    const secteurs = [
      { value: 'informatique-numerique', label: 'Informatique / Numérique', order: 1, active: true },
      { value: 'sante-social', label: 'Santé / Social', order: 2, active: true },
      { value: 'btp-artisanat', label: 'BTP / Artisanat', order: 3, active: true },
      { value: 'commerce-vente', label: 'Commerce / Vente', order: 4, active: true },
      { value: 'education-formation', label: 'Education/Formation', order: 5, active: true },
      { value: 'transport-logistique', label: 'Transport / Logistique', order: 6, active: true },
      { value: 'industrie-production', label: 'Industrie / Production', order: 7, active: true },
      { value: 'communication-marketing', label: 'Communication / Marketing', order: 8, active: true },
      { value: 'droit-juridique', label: 'Droit / Juridique', order: 9, active: true },
      { value: 'agriculture-environnement', label: 'Agriculture / Environnement', order: 10, active: true },
      { value: 'demandeur-emploi', label: 'Demandeur d\'emploi', order: 11, active: true },
      { value: 'etudiant', label: 'Étudiant', order: 12, active: true },
      { value: 'entrepreneur', label: 'Entrepreneur', order: 13, active: true },
      { value: 'autre', label: 'Autre', order: 14, active: true }
    ];

    await queryInterface.bulkInsert('Secteurs', secteurs.map(secteur => ({
      ...secteur,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});

    const secteursInseres = await queryInterface.sequelize.query(
      'SELECT id, value FROM Secteurs;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const secteurMap = secteursInseres.reduce((acc, secteur) => {
      acc[secteur.value] = secteur.id;
      return acc;
    }, {});

    const professionsParSecteur = {
      'informatique-numerique': [
        'Développeur', 'Product owner', 'Administrateur systèmes', 'Data analyst', 'Chef de projet IT', 'UX/UI Designer', 'Scrum master', 'Directeur, Directrice', 'Autre'
      ],
      'sante-social': [
        'Médecin généraliste', 'Infirmier / Infirmière', 'Aide-soignant', 'Psychologue', 'Pharmacien', 'Assistant social', 'Directeur, Directrice', 'Autre'
      ],
      'btp-artisanat': [
        'Maçon', 'Électricien', 'Plombier', 'Peintre en bâtiment', 'Charpentier', 'Chef de chantier', 'Ingénieur', 'Conducteur de travaux', 'Directeur de travaux, Directrice', 'Responsable bureau d\'études', 'Architect', 'Couvreur', 'Carreleur', 'Menuisier', 'Serrurier', 'Plaquiste', 'Grutier', 'Ingénieur en génie civil', 'Géomètre-topographe', 'Manœuvre', 'Technicien de maintenance bâtiment', 'Architecte', 'Dessinateur-projeteur', 'Autre'
      ],
      'commerce-vente': [
        'Vendeur en magasin', 'Responsable commercial', 'Chargé de clientèle', 'Caissier / Caissière', 'Manager de rayon', 'Téléconseiller', 'Conseiller de vente', 'Représentant commercial', 'Responsable de magasin', 'Chef de secteur', 'Marchandiseur', 'Commercial terrain', 'Négociateur commercial', 'Animateur des ventes', 'Technico-commercial', 'Assistant commercial', 'Attaché commercial', 'Responsable grands comptes', 'Responsable e-commerce', 'Chef de produit', 'Directeur, Directrice', 'Autre'
      ],
      'education-formation': [
        'Professeur des écoles', 'Enseignant du secondaire', 'Formateur', 'Éducateur spécialisé', 'Conseiller d\'orientation', 'Maître de conférence', 'Chargé de TD / TP', 'Surveillant scolaire', 'Directeur d\'établissement scolaire', 'Assistant d\'éducation', 'Accompagnant d\'élèves en situation de handicap (AESH)', 'Animateur pédagogique', 'Inspecteur de l\'Éducation nationale', 'Documentaliste scolaire', 'Conseiller principal d\'éducation (CPE)', 'Formateur en entreprise', 'Coach scolaire', 'Responsable de formation', 'Tuteur pédagogique', 'Directeur, Directrice', 'Autre'
      ],
      'transport-logistique': [
        'Pilote de drone', 'Pilote d\'avion', 'Chauffeur poids lourd', 'Magasinier / Cariste', 'Agent logistique', 'Conducteur de train, tram, métro', 'Livreur', 'Chauffeur VTC', 'Conducteur de bus', 'Responsable logistique', 'Préparateur de commandes', 'Agent de quai', 'Agent d\'exploitation transport', 'Chef de quai', 'Coursier', 'Pilote de ligne', 'Affréteur', 'Gestionnaire de stocks', 'Responsable d\'entrepôt', 'Dispatcher', 'Technicien en logistique', 'Coordinateur transport', 'Directeur, Directrice', 'Autre'
      ],
      'industrie-production': [
        'Opérateur de production', 'Soudeur', 'Technicien de maintenance', 'Ingénieur industriel', 'Contrôleur qualité', 'Électromécanicien', 'Chef d\'atelier', 'Conducteur de ligne', 'Agent de fabrication', 'Technicien méthodes', 'Directeur, Directrice', 'Autre'
      ],
      'communication-marketing': [
        'Chargé de communication', 'Community manager', 'Graphiste', 'Chef de produit', 'Responsable marketing', 'Rédacteur web', 'Chargé d\'études marketing', 'Directeur, Directrice', 'Autre'
      ],
      'droit-juridique': [
        'Avocat', 'Notaire', 'Juriste d\'entreprise', 'Clerc de notaire', 'Assistant juridique', 'Conseiller juridique', 'Autre'
      ],
      'agriculture-environnement': [
        'Agriculteur', 'Éleveur', 'Technicien environnement', 'Paysagiste', 'Garde forestier', 'Viticulteur', 'Autre'
      ],
      'demandeur-emploi': [
        'Sans activité professionnelle', 'En recherche de poste', 'En reconversion', 'Autre'
      ],
      'etudiant': [
        'Étudiant en informatique', 'Étudiant en médecine', 'Étudiant en commerce', 'Étudiant en droit', 'Autre'
      ],
      'entrepreneur': [
        'Fondateur de startup', 'Auto-entrepreneur', 'Consultant indépendant', 'Chef d\'entreprise', 'Travailleur freelance', 'Autre'
      ],
      'autre': ['Autre']
    };

    // Création des professions (sans doublons)
    const professionLabels = new Set();
    Object.values(professionsParSecteur).forEach(list => list.forEach(label => professionLabels.add(label)));
    const professions = Array.from(professionLabels).map((label, idx) => ({
      value: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label,
      order: idx + 1,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('Professions', professions, {});

    // Récupérer les professions insérées
    const professionsInseres = await queryInterface.sequelize.query(
      'SELECT id, label FROM Professions;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const professionMap = professionsInseres.reduce((acc, prof) => {
      acc[prof.label] = prof.id;
      return acc;
    }, {});

    // Création des relations secteur-profession
    const relations = [];
    Object.entries(professionsParSecteur).forEach(([secteurValue, profLabels]) => {
      const secteurId = secteurMap[secteurValue];
      profLabels.forEach(label => {
        const professionId = professionMap[label];
        if (secteurId && professionId) {
          relations.push({
            secteur_id: secteurId,
            profession_id: professionId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });
    });

    await queryInterface.bulkInsert('SecteurProfessions', relations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SecteurProfessions', null, {});
    await queryInterface.bulkDelete('Professions', null, {});
    await queryInterface.bulkDelete('Secteurs', null, {});
  }
}; 