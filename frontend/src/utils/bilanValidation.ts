import { BilanData } from '../types/bilan';

export interface BilanStep {
  id: number;
  title: string;
  validate: (data: BilanData) => { isValid: boolean; errorMessage: string };
}

export const bilanSteps: BilanStep[] = [
  {
    id: 1,
    title: "Informations Personnelles",
    validate: (data) => {
      const { informations } = data;
      if (!informations.civility) return { isValid: false, errorMessage: "Veuillez sélectionner une civilité." };
      if (!informations.date_naissance) return { isValid: false, errorMessage: "Veuillez renseigner la date de naissance." };
      if (!informations.age) return { isValid: false, errorMessage: "Veuillez renseigner l'âge." };
      if (!informations.adresse) return { isValid: false, errorMessage: "Veuillez renseigner l'adresse." };
      if (!informations.code_postal) return { isValid: false, errorMessage: "Veuillez renseigner le code postal." };
      if (!informations.ville) return { isValid: false, errorMessage: "Veuillez renseigner la ville." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 2,
    title: "Informations Professionnelles",
    validate: (data) => {
      const { informationsProfessionnelles } = data;
      if (!informationsProfessionnelles.secteur_activite) return { isValid: false, errorMessage: "Veuillez sélectionner un secteur d'activité." };
      if (!informationsProfessionnelles.profession) return { isValid: false, errorMessage: "Veuillez sélectionner une profession." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 3,
    title: "Objectifs",
    validate: (data) => {
      if (data.objectifs.length === 0) return { isValid: false, errorMessage: "Veuillez définir au moins un objectif." };
      if (!data.objectifs.every(obj => obj.titre.trim() !== "")) return { isValid: false, errorMessage: "Veuillez renseigner un titre pour chaque objectif." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 4,
    title: "Informations Générales",
    validate: (data) => {
      const { informations } = data;
      if (!informations.taille || informations.taille <= 0) return { isValid: false, errorMessage: "Veuillez indiquer la taille." };
      if (!informations.poids || informations.poids <= 0) return { isValid: false, errorMessage: "Veuillez indiquer le poids." };
      if (!informations.activite) return { isValid: false, errorMessage: "Veuillez indiquer l'activité physique." };
      if (!informations.imc || informations.imc <= 0) return { isValid: false, errorMessage: "Veuillez indiquer l'IMC." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 5,
    title: "Antécédents Médicaux",
    validate: (data) => {
      const { antecedents } = data;
      if (typeof antecedents.antecedents_medicaux !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne a des antécédents médicaux." };
      if (antecedents.antecedents_medicaux && !antecedents.antecedents_medicaux_precisions) return { isValid: false, errorMessage: "Veuillez préciser les antécédents médicaux." };
      if (typeof antecedents.operations_accidents !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne a eu des opérations ou accidents." };
      if (antecedents.operations_accidents && !antecedents.operations_accidents_precisions) return { isValid: false, errorMessage: "Veuillez préciser les opérations ou accidents." };
      if (typeof antecedents.traitements_actuels !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne a des traitements actuels." };
      if (antecedents.traitements_actuels && !antecedents.traitements_actuels_precisions) return { isValid: false, errorMessage: "Veuillez préciser les traitements actuels." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 6,
    title: "Symptômes",
    validate: (data) => {
      const { symptomes } = data;
      if (typeof symptomes.douleurs_thoraciques !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne a des douleurs thoraciques." };
      if (symptomes.douleurs_thoraciques && !symptomes.douleurs_thoraciques_precisions) return { isValid: false, errorMessage: "Veuillez préciser les douleurs thoraciques." };
      if (typeof symptomes.douleurs_chroniques !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne a des douleurs chroniques." };
      if (symptomes.douleurs_chroniques && !symptomes.douleurs_chroniques_precisions) return { isValid: false, errorMessage: "Veuillez préciser les douleurs chroniques." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 7,
    title: "Habitudes",
    validate: (data) => {
      const { habitudes } = data;
      if (typeof habitudes.fumeur !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne fume." };
      if (typeof habitudes.consommation_alcool !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne consomme de l'alcool." };
      if (habitudes.consommation_alcool && !habitudes.alcool_details) return { isValid: false, errorMessage: "Veuillez préciser la consommation d'alcool." };
      if (!habitudes.alcool_indicateur) return { isValid: false, errorMessage: "Veuillez renseigner l'indicateur d'alcool." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 8,
    title: "Sommeil",
    validate: (data) => {
      const { sommeil } = data;
      if (!sommeil.nb_heures_sommeil) return { isValid: false, errorMessage: "Veuillez indiquer le nombre d'heures de sommeil." };
      if (!sommeil.nb_repas) return { isValid: false, errorMessage: "Veuillez indiquer le nombre de repas." };
      if (typeof sommeil.collation !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si la personne prend une collation." };
      if (sommeil.collation && !sommeil.collation_details) return { isValid: false, errorMessage: "Veuillez préciser la collation." };
      if (!sommeil.petit_dejeuner) return { isValid: false, errorMessage: "Veuillez indiquer si la personne prend un petit-déjeuner." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 9,
    title: "Métabolisme",
    validate: (data) => {
      const { metabasal } = data;
      if (typeof metabasal.nap !== 'number' || metabasal.nap < 1 || metabasal.nap > 5) return { isValid: false, errorMessage: "Veuillez renseigner le NAP (entre 1 et 5)." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 10,
    title: "Tests Physiques Principaux",
    validate: (data) => {
      const { testsphysiques } = data;
      if (typeof testsphysiques.test_effort_6_mois !== 'boolean') return { isValid: false, errorMessage: "Veuillez indiquer si un test d'effort a été réalisé dans les 6 derniers mois." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 11,
    title: "Tests Équilibre",
    validate: (data) => {
      const { testequilibre } = data;
      if (typeof testequilibre.test_equilibre_1 !== 'number') return { isValid: false, errorMessage: "Veuillez renseigner la première valeur du test d'équilibre." };
      if (typeof testequilibre.test_equilibre_2 !== 'number') return { isValid: false, errorMessage: "Veuillez renseigner la deuxième valeur du test d'équilibre." };
      if (typeof testequilibre.test_equilibre_resultat === 'undefined' || isNaN(Number(testequilibre.test_equilibre_resultat))) return { isValid: false, errorMessage: "Veuillez renseigner le résultat du test d'équilibre." };
      if (Number(testequilibre.test_equilibre_resultat) < 1 || Number(testequilibre.test_equilibre_resultat) > 4) return { isValid: false, errorMessage: "Le résultat du test d'équilibre doit être entre 1 et 4." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 12,
    title: "Tests Souplesse",
    validate: (data) => {
      const { testsouplesse } = data;
      if (typeof testsouplesse.test_souplesse_resultat !== 'number') return { isValid: false, errorMessage: "Veuillez renseigner le résultat du test de souplesse." };
      if (testsouplesse.test_souplesse_resultat < 1 || testsouplesse.test_souplesse_resultat > 5) return { isValid: false, errorMessage: "Le résultat du test de souplesse doit être entre 1 et 5." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 13,
    title: "Tests Force Inférieure",
    validate: (data) => {
      const { testforceinf } = data;
      if (!testforceinf.test_force_inf_resultat) return { isValid: false, errorMessage: "Veuillez renseigner le résultat du test de force inférieure." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 14,
    title: "Tests Force Supérieure",
    validate: (data) => {
      const { testforcesup } = data;
      if (!testforcesup.test_force_sup_resultat) return { isValid: false, errorMessage: "Veuillez renseigner le résultat du test de force supérieure." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 15,
    title: "Tests Endurance",
    validate: (data) => {
      const { testendurance } = data;
      if (typeof testendurance.test_endurance_resultat !== 'number') return { isValid: false, errorMessage: "Veuillez renseigner le résultat du test d'endurance." };
      if (testendurance.test_endurance_resultat < 1 || testendurance.test_endurance_resultat > 5) return { isValid: false, errorMessage: "Le résultat du test d'endurance doit être entre 1 et 5." };
      if (typeof testendurance.test_endurance_lbn !== 'number') return { isValid: false, errorMessage: "Veuillez renseigner la LBN du test d'endurance." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 16,
    title: "Tests VMA",
    validate: (data) => {
      const { testvma } = data;
      if (!testvma.test_vma_resultat) return { isValid: false, errorMessage: "Veuillez renseigner le résultat du test VMA." };
      if (typeof testvma.test_vma_vo2max !== 'number') return { isValid: false, errorMessage: "Veuillez renseigner la VO2max (nombre) pour le test VMA." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 17,
    title: "Echelle de Borg",
    validate: (data) => {
      const { fatigue1 } = data;
      if (!fatigue1.fatigue_equilibre) return { isValid: false, errorMessage: "Veuillez renseigner la fatigue liée à l'équilibre." };
      if (!fatigue1.fatigue_force_inf) return { isValid: false, errorMessage: "Veuillez renseigner la fatigue liée à la force inférieure." };
      if (!fatigue1.fatigue_souplesse) return { isValid: false, errorMessage: "Veuillez renseigner la fatigue liée à la souplesse." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 18,
    title: "Echelle de Borg",
    validate: (data) => {
      const { fatigue2 } = data;
      if (!fatigue2.fatigue_vma) return { isValid: false, errorMessage: "Veuillez renseigner la fatigue liée à la VMA." };
      if (!fatigue2.fatigue_force_sup) return { isValid: false, errorMessage: "Veuillez renseigner la fatigue liée à la force supérieure." };
      if (!fatigue2.fatigue_endurance) return { isValid: false, errorMessage: "Veuillez renseigner la fatigue liée à l'endurance." };
      return { isValid: true, errorMessage: '' };
    }
  },
  {
    id: 19,
    title: "Activités",
    validate: (data) => {
      const activitesPrincipales = data.activites.filter(a => !a.estOptionnelle);
      if (activitesPrincipales.length === 0) return { isValid: false, errorMessage: "Veuillez ajouter au moins une activité principale." };
      for (const activite of data.activites) {
        if (!activite.type || activite.type.trim() === '') return { isValid: false, errorMessage: "Veuillez sélectionner un type pour chaque activité." };
        if (!activite.frequence || activite.frequence.trim() === '') return { isValid: false, errorMessage: "Veuillez sélectionner une fréquence pour chaque activité." };
      }
      return { isValid: true, errorMessage: '' };
    }
  }
];

export const getStepValidation = (stepId: number, data: BilanData): { isValid: boolean; errorMessage: string } => {
  const step = bilanSteps.find(s => s.id === stepId);
  if (!step) {
    return { isValid: false, errorMessage: "Étape non trouvée" };
  }
  return step.validate(data);
}; 