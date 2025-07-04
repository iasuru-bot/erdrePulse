import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import React, { useEffect} from 'react';
import { TestEndurance } from '../../types/bilan';
import ImageWithModal from '../common/ImageWithModal';

interface TestsSectionProps {
  tests: TestEndurance;
  onTestsChange: (tests: TestEndurance) => void;
  taille?: number;
  poids?: number;
  age?: number;
  sexe?: "Homme" | "Femme" | "Autre";
}

const TestsEnduranceSection: React.FC<TestsSectionProps> = ({
  tests,
  onTestsChange,
  taille,
  poids,
  age,
  sexe,
}) => {
  const handleChange = (field: keyof TestEndurance, value: any) => {
    onTestsChange({
      ...tests,
      [field]: value
    });
  };
  useEffect(() => {
  const t = taille || 0;
  const p = poids || 0;
  const a = age || 0;
  const s = sexe || "autre";

  let lbn = 0;

  if (s === "Homme") {
    lbn = (7.57 * t) - (5.02 * a) - (1.76 * p) - 309 - 153;
  } else if (s === "Femme") {
    lbn = (2.11 * t) - (2.29 * p) - (5.78 * a) + 667 - 139;
  } else {
    const homme = (7.57 * t) - (5.02 * a) - (1.76 * p) - 309;
    const femme = (2.11 * t) - (2.29 * p) - (5.78 * a) + 667 - 139;
    lbn = (homme + femme) / 2;
  }

  const lbnRounded = Number(lbn.toFixed(2));

  if (tests.test_endurance_lbn !== lbnRounded) {
    onTestsChange({ ...tests, test_endurance_lbn: lbnRounded });
  }
}, [taille, poids, age, sexe]);
  return (
    <div className="space-y-6">
      {/* Test d'endurance */}
      <div className="space-y-4">
        

        <p className="text-sm text-[#023047] font-semibold">
          Test 6 minutes marche (TM6)
        </p>
        <ImageWithModal
          src="/images/TEST_D_ENDURENCE.png"
          alt="Tableau TM6"
          className="w-full rounded shadow mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Résultat (indice)"
            type="number"
            value={tests.test_endurance_resultat || ""}
            onChange={(e) =>
              handleChange(
                "test_endurance_resultat",
                parseFloat(e.target.value)
              )
            }
            placeholder="Indice du tableau"
          />

          <FormInput
            label="LBN (en mètres)"
            type="number"
            value={tests.test_endurance_lbn || ""}
            onChange={(e) =>
              handleChange("test_endurance_lbn", parseFloat(e.target.value))
            }
            placeholder="Calculé automatiquement"
            
          />
        </div>

        <div>
          <FormTextarea
            value={tests.test_endurance_commentaire || ""}
            onChange={(e) =>
              handleChange("test_endurance_commentaire", e.target.value)
            }
            maxLength={500}
            rows={3}
            placeholder="Ex : Résultat cohérent avec les efforts récents en cardio." label={'Commentaire'}
          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_endurance_commentaire?.length || 0}/500
          </div>
        </div>

        <div>
          <FormTextarea
            value={tests.test_endurance_conseil || ""}
            onChange={(e) =>
              handleChange("test_endurance_conseil", e.target.value)
            }
            maxLength={500}
            rows={3}
            placeholder="Ex : Ajoute des séances de marche rapide ou vélo 2 fois/semaine." label={'Conseils pour progresser'}
          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_endurance_conseil?.length || 0}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsEnduranceSection;
