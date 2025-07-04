export interface Objectif {
  titre: string;
  description?: string;
}

export interface Antecedents {
  antecedents_medicaux: boolean | null;
  antecedents_medicaux_precisions?: string;
  operations_accidents: boolean | null;
  operations_accidents_precisions?: string;
  traitements_actuels: boolean | null;
  traitements_actuels_precisions?: string;
}

export interface Symptomes {
  douleurs_thoraciques: boolean | null;
  douleurs_thoraciques_precisions?: string;
  douleurs_chroniques: boolean | null;
  douleurs_chroniques_precisions?: string;
}

export interface Habitudes {
  fumeur: boolean | null;
  consommation_alcool: boolean | null;
  alcool_details?: string;
  alcool_indicateur?: string;
}

export interface TestsPhysiques {
  test_effort_6_mois: boolean | null;
  test_effort_commentaire?: string;
}

export interface TestsEquilibres {
  test_equilibre_1?: number;
  test_equilibre_2?: number;
  test_equilibre_resultat?: string;
  test_equilibre_commentaire?: string;
  test_equilibre_conseil?: string;
}

export interface TestSouplesse {
  test_souplesse_resultat?: number;
  test_souplesse_commentaire?: string;
  test_souplesse_conseil?: string;
}

export interface TestForceInf {
  test_force_inf_resultat?: string;
  test_force_inf_commentaire?: string;
  test_force_inf_conseil?: string;
}

export interface TestForceSup {
  test_force_sup_resultat?: string;
  test_force_sup_commentaire?: string;
  test_force_sup_conseil?: string;
}

export interface TestEndurance {
  test_endurance_resultat?: number;
  test_endurance_lbn?: number;
  test_endurance_commentaire?: string;
  test_endurance_conseil?: string;
}

export interface TestVMA {
  test_vma_resultat?: string;
  test_vma_vo2max?: number;
  test_vma_commentaire?: string;
  test_vma_conseil?: string;
}

export interface InfosGenerales {
  civility: string;
  date_naissance: string;
  age: number;
  adresse: string;
  complement_adresse: string;
  code_postal: string;
  ville: string;
  taille: number;
  poids: number;
  imc: number;
  interpretation: string;
  activite: string;
}

export interface InformationsProfessionnelles {
  secteur_activite: string;
  autre_secteur?: string;
  profession: string;
  autre_profession?: string;
}

export interface Recommandation {
  type: string;
  titre: string;
  description: string;
  frequence: string;
}

export interface Fatigue1 {
  fatigue_force_sup?: string;
  fatigue_endurance?: string;
  fatigue_vma?: string;
  fatigue_equilibre?: string;
  fatigue_souplesse?: string;
  fatigue_force_inf?: string;
  fatigue_commentaire?: string;
}

export interface Fatigue2 {
  fatigue_force_sup?: string;
  fatigue_endurance?: string;
  fatigue_vma?: string;
  fatigue_commentaire?: string;
}

export interface Sommeil {
  nb_heures_sommeil: string;
  nb_repas: string;
  petit_dejeuner?: string;
  collation: boolean | null;
  collation_details?: string;
}

export interface Activite {
  type: string;
  frequence: string;
  estOptionnelle: boolean;
}

export interface Metabasal {
   nap?: number,
   commentaire_metabolisme: string,
}

export interface BilanData {
  clientNom: string;
  informations: InfosGenerales;
  objectifs: Objectif[];
  habitudes: Habitudes;
  testsphysiques: TestsPhysiques;
  testequilibre: TestsEquilibres;
  testsouplesse: TestSouplesse;
  testforceinf: TestForceInf;
  testforcesup: TestForceSup;
  testendurance: TestEndurance;
  testvma: TestVMA;
  recommandations: Recommandation[];
  metabasal : Metabasal;
  fatigue1: Fatigue1;
  fatigue2: Fatigue2;
  antecedents: Antecedents;
  symptomes: Symptomes;
  sommeil: Sommeil;
  informationsProfessionnelles: InformationsProfessionnelles;
  activites: Activite[];
  commentaire_activites: string;
}

export interface BilanPayload {
  date: string;
  taille: number;
  poids: number;
  niveau_activite_physique: string;
  nap: number;
  commentaire_global: string;
  clientId: number;
  objectifs: Objectif[];
  activites: Activite[];
  santeVie: {
    antecedents_medicaux: boolean;
    antecedents_medicaux_precisions?: string;
    operations_accidents: boolean;
    operations_accidents_precisions?: string;
    traitements_actuels: boolean;
    traitements_actuels_precisions?: string;
    douleurs_thoraciques: boolean;
    douleurs_thoraciques_precisions?: string;
    douleurs_chroniques: boolean;
    douleurs_chroniques_precisions?: string;
    fumeur: boolean;
    consommation_alcool: boolean;
    heures_alcool_semaine?: number;
    nb_heures_sommeil: string;
    nb_repas: string;
    petit_dejeuner?: string;
    collation: boolean;
    collation_details?: string;
  };
  testsPhysiques: {
    test_effort_6_mois: boolean;
    test_effort_commentaire?: string;
    test_equilibre_1?: number;
    test_equilibre_2?: number;
    test_equilibre_resultat?: string;
    test_equilibre_commentaire?: string;
    test_equilibre_conseil?: string;
    test_souplesse_resultat?: number;
    test_souplesse_commentaire?: string;
    test_souplesse_conseil?: string;
    test_force_inf_resultat?: string;
    test_force_inf_commentaire?: string;
    test_force_inf_conseil?: string;
    test_force_sup_resultat?: string;
    test_force_sup_commentaire?: string;
    test_force_sup_conseil?: string;
    test_endurance_resultat?: number;
    test_endurance_lbn?: number;
    test_endurance_commentaire?: string;
    test_endurance_conseil?: string;
    test_vma_resultat?: string;
    test_vma_vo2max?: number;
    test_vma_commentaire?: string;
    test_vma_conseil?: string;
    fc_repos?: number;
    fc_max?: number;
    fc_reserve?: number;
    vo2max?: number;
    imc?: number;
    masse_grasse?: number;
    masse_musculaire?: number;
    commentaire_general?: string;
  };
} 