import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import React from 'react';
import { TestVMA } from '../../types/bilan';
import ImageWithModal from '../common/ImageWithModal';
interface TestsSectionProps {
  tests: TestVMA;
  onTestsChange: (tests: TestVMA) => void;
}

const TestsVMASection: React.FC<TestsSectionProps> = ({
  tests,
  onTestsChange,
}) => {
  const handleChange = (field: keyof TestVMA, value: any) => {
    onTestsChange({
      ...tests,
      [field]: value
    });
  };
  return (
    <div className="space-y-6">
      {/* Test VMA */}
      <div className="space-y-4">
        

        <p className="text-sm text-[#023047] font-semibold">
          Vitesse Maximale Aérobie
        </p>
        <ImageWithModal
          src="/images/TEST_VMA.jpg"
          alt="Tableau VMA"
          className="w-full rounded shadow mb-4"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="VMA (km/h)"
            value={tests.test_vma_resultat || ""}
            onChange={(e) => handleChange("test_vma_resultat", e.target.value)}
            placeholder="Ex : 13.5"
          />

          <FormInput
            label="VO2 max (ml/kg/min)"
            type="number"
            value={tests.test_vma_vo2max || ""}
            onChange={(e) =>
              handleChange("test_vma_vo2max", parseFloat(e.target.value))
            }
            placeholder="Ex : 45"
          />
        </div>

        <div>
        
          <FormTextarea
            value={tests.test_vma_commentaire || ""}
            onChange={(e) =>
              handleChange("test_vma_commentaire", e.target.value)
            }
            maxLength={500}
            rows={3}
            placeholder="Ex : VMA cohérente avec les autres indicateurs de forme cardio." label={'Commentaire'}
          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_vma_commentaire?.length || 0}/500
          </div>
        </div>

        <div>
          
          <FormTextarea
            value={tests.test_vma_conseil || ""}
            onChange={(e) => handleChange("test_vma_conseil", e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Ex : Intègre une séance de fractionné court/semaine pour augmenter ta VMA." label={'Conseils pour progresser'}
          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_vma_conseil?.length || 0}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsVMASection;
