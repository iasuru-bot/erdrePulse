import React from 'react';
import { BilanData } from '../../types/bilan';
import InfosPersonnellesSection from './InfosPersonnellesSection';
import InformationsProfessionnellesSection from './InformationsProfessionnellesSection';
import ObjectifsSection from './ObjectifsSection';
import InformationsGeneralesSection from './InformationsGeneralesSection';
import AntecedentsMedicauxSection from './AntecedentsMedicauxSection';
import SymptomeOuDouleurSection from './SymptomesOuDouleursSection';
import HabitudesSection from './HabitudesSection';
import SommeilSection from './SommeilSection';
import MetabolismeSection from './MetabolismeSection';
import TestsPhysiquesPrincipauxSection from './TestsPhysiquesPrincipaux';
import TestsEquilibreSection from './TestEquilibre';
import TestsSouplesseSection from './TestSouplesse';
import TestsForceInfSection from './TestForceInf';
import TestsForceSupSection from './TestForceSup';
import TestsEnduranceSection from './TestEndurance';
import TestsVMASection from './TestVMA';
import FatigueSection1 from './FatigueSection1';
import FatigueSection2 from './FatigueSection2';
import ActivitesSection from './ActivitesSection';

interface BilanStepManagerProps {
  currentStep: number;
  bilanData: BilanData;
  onDataChange: (data: Partial<BilanData>) => void;
}

const BilanStepManager: React.FC<BilanStepManagerProps> = ({
  currentStep,
  bilanData,
  onDataChange,
}) => {
  const stepComponents: { [key: number]: React.ReactNode } = {
    1: (
      <InfosPersonnellesSection
        infos={bilanData.informations}
        onChange={(infos) => onDataChange({ informations: infos })}
      />
    ),
    2: (
      <InformationsProfessionnellesSection
        informationsProfessionnelles={bilanData.informationsProfessionnelles}
        onChange={(infos) =>
          onDataChange({ informationsProfessionnelles: infos })
        }
        
      />
    ),
    3: (
      <ObjectifsSection
        objectifs={bilanData.objectifs}
        onObjectifsChange={(objectifs) => onDataChange({ objectifs })}
      />
    ),
    4: (
      <InformationsGeneralesSection
        infos={bilanData.informations}
        onChange={(infos) => onDataChange({ informations: infos })}
      />
    ),
    5: (
      <AntecedentsMedicauxSection
        santeVie={bilanData.antecedents}
        onSanteVieChange={(antecedents) => onDataChange({ antecedents })}
      />
    ),
    6: (
      <SymptomeOuDouleurSection
        santeVie={bilanData.symptomes}
        onSanteVieChange={(symptomes) => onDataChange({ symptomes })}
      />
    ),
    7: (
      <HabitudesSection
        santeVie={bilanData.habitudes}
        onSanteVieChange={(habitudes) => onDataChange({ habitudes })}
      />
    ),
    8: (
      <SommeilSection
        santeVie={bilanData.sommeil}
        onSanteVieChange={(sommeil) => onDataChange({ sommeil })}
      />
    ),
    9: (
      <MetabolismeSection
        metabasal={bilanData.metabasal}
        poids={bilanData.informations.poids}
        taille={bilanData.informations.taille}
        age={bilanData.informations.age}
        sexe={bilanData.informations.civility as "Homme" | "Femme" | "Autre"}
        onNapChange={(updated) => onDataChange({ metabasal: updated })}
      />
    ),
    10: (
      <TestsPhysiquesPrincipauxSection
        tests={bilanData.testsphysiques}
        onTestsChange={(tests) => onDataChange({ testsphysiques: tests })}
      />
    ),
    11: (
      <TestsEquilibreSection
        tests={bilanData.testequilibre}
        onTestsChange={(tests) => onDataChange({ testequilibre: tests })}
      />
    ),
    12: (
      <TestsSouplesseSection
        tests={bilanData.testsouplesse}
        onTestsChange={(tests) => onDataChange({ testsouplesse: tests })}
      />
    ),
    13: (
      <TestsForceInfSection
        tests={bilanData.testforceinf}
        onTestsChange={(tests) => onDataChange({ testforceinf: tests })}
      />
    ),
    14: (
      <TestsForceSupSection
        tests={bilanData.testforcesup}
        onTestsChange={(tests) => onDataChange({ testforcesup: tests })}
      />
    ),
    15: (
      <TestsEnduranceSection
        tests={bilanData.testendurance}
        onTestsChange={(tests) => onDataChange({ testendurance: tests })}
        taille={bilanData.informations.taille}
        poids={bilanData.informations.poids}
        age={bilanData.informations.age}
        sexe={bilanData.informations.civility as "Homme" | "Femme" | "Autre"}
      />
    ),
    16: (
      <TestsVMASection
        tests={bilanData.testvma}
        onTestsChange={(tests) => onDataChange({ testvma: tests })}
      />
    ),
    17: (
      <FatigueSection1
        fatigue={bilanData.fatigue1}
        onChange={(fatigue) => onDataChange({ fatigue1: fatigue })}
      />
    ),
    18: (
      <FatigueSection2
        fatigue={bilanData.fatigue2}
        onChange={(fatigue) => onDataChange({ fatigue2: fatigue })}
      />
    ),
    19: (
      <ActivitesSection
        activites={bilanData.activites}
        onActivitesChange={(activites) => onDataChange({ activites })}
        commentaire={bilanData.commentaire_activites}
        onCommentaireChange={(commentaire) =>
          onDataChange({ commentaire_activites: commentaire })
        }
      />
    ),
  };

  return <>{stepComponents[currentStep]}</>;
};

export default BilanStepManager; 