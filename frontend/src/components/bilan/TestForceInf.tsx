import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import React from 'react';
import { TestForceInf } from '../../types/bilan';
import ImageWithModal from '../common/ImageWithModal';

interface TestsSectionProps {
  tests: TestForceInf;
  onTestsChange: (tests: TestForceInf) => void;
}

const TestsForceInfSection: React.FC<TestsSectionProps> = ({
  tests,
  onTestsChange,
}) => {
  const handleChange = (field: keyof TestForceInf, value: any) => {
    onTestsChange({
      ...tests,
      [field]: value
    });
  };
  return (
    <div className="space-y-6">
      {/* Test de force INF */}
      <div className="space-y-4">
        <h3 className="text-[#023047] font-bold text-base uppercase">
          Test de FORCE INF
        </h3>

        <p className="text-sm text-[#023047] font-semibold">
          Mesure de la force membre INF
        </p>
        <ImageWithModal 
          src="/images/TABLEAU AMELIORE.png"
          alt="Tableau force INF"
          className="w-full rounded shadow mb-4"
        />

        <FormInput
          label="Résultat"
          value={tests.test_force_inf_resultat || ""}
          onChange={(e) =>
            handleChange("test_force_inf_resultat", e.target.value)
          }
          placeholder="Ex : Moyen, Faible, Élevé…"
        />

        <div>
          <FormTextarea
            value={tests.test_force_inf_commentaire || ""}
            onChange={(e) => handleChange("test_force_inf_commentaire", e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Ex : Tu pourrais être un peu plus fort avec une meilleure stabilité de gainage." label={'Commentaire'}          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_force_inf_commentaire?.length || 0}/500
          </div>
        </div>

        <div>
          <FormTextarea
            value={tests.test_force_inf_conseil || ""}
            onChange={(e) => handleChange("test_force_inf_conseil", e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Ex : Travaille la force des jambes avec des exercices comme les fentes ou les squats lestés." label={'Conseils pour progresser'}          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_force_inf_conseil?.length || 0}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsForceInfSection;
