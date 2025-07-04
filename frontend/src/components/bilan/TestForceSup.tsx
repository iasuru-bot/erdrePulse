import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import React from 'react';
import { TestForceSup } from '../../types/bilan';
import ImageWithModal from '../common/ImageWithModal';
interface TestsSectionProps {
  tests: TestForceSup;
  onTestsChange: (tests: TestForceSup) => void;
}

const TestsForceSupSection: React.FC<TestsSectionProps> = ({
  tests,
  onTestsChange,
}) => {
  const handleChange = (field: keyof TestForceSup, value: any) => {
    onTestsChange({
      ...tests,
      [field]: value
    });
  };
  return (
    <div className="space-y-6">
      {/* Test de FORCE SUP */}
      <div className="space-y-4">
       

        <p className="text-sm text-[#023047] font-semibold">
          Mesure de la force membre SUP
        </p>
        <ImageWithModal
          src="/images/Tableau_force_Memb_Superieur.jpg"
          alt="Tableau force SUP"
          className="w-full rounded shadow mb-4"
        />

        <FormInput
          label="Résultat"
          value={tests.test_force_sup_resultat || ""}
          onChange={(e) =>
            handleChange("test_force_sup_resultat", e.target.value)
          }
          placeholder="Ex : Faible, Normal, Élevé…"
        />

        <div>
         
          <FormTextarea
            value={tests.test_force_sup_commentaire || ""}
            onChange={(e) =>
              handleChange("test_force_sup_commentaire", e.target.value)
            }
            maxLength={500}
            rows={3}
            placeholder="Ex : Tu manques un peu d’explosivité au démarrage." label={'Commentaire'}
          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_force_sup_commentaire?.length || 0}/500
          </div>
        </div>

        <div>
          
          <FormTextarea
            value={tests.test_force_sup_conseil || ""}
            onChange={(e) =>
              handleChange("test_force_sup_conseil", e.target.value)
            }
            maxLength={500}
            rows={3}
            placeholder="Ex : Ajoute des pompes lestées, tractions ou élastiques pour renforcer le haut du corps." label={'Conseils pour progresser'}
          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_force_sup_conseil?.length || 0}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsForceSupSection;
