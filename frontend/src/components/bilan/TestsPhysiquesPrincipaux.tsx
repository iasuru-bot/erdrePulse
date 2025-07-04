import { TestsPhysiques } from '../../types/bilan';
import FormCheckbox from '../common/FormCheckbox';
import FormTextarea from '../common/FormTextarea';
import FormRadioOuiNon from '../common/FormRadioOuiNon';


interface TestsSectionProps {
  tests: TestsPhysiques;
  onTestsChange: (tests: TestsPhysiques) => void;
  
}

const TestsPhysiquesPrincipauxSection: React.FC<TestsSectionProps> = ({
  tests,
  onTestsChange,
}) => {
  const handleChange = (field: keyof TestsPhysiques, value: any) => {
    onTestsChange({
      ...tests,
      [field]: value
    });
  };
  return (
    <div className="space-y-6">
      {/* Test Physique */}
      <p className="text-[#023047] font-medium text-sm mb-1">
        Avez-vous effectué un test à l'effort au cours des 6 derniers mois ?
      </p>

      <div className="mb-2">
        <FormRadioOuiNon
          value={tests.test_effort_6_mois}
          onChange={(val) => handleChange("test_effort_6_mois", val)}
        />
      </div>

      {tests.test_effort_6_mois === true && (
        <div className="space-y-1">
         
          <FormTextarea
            value={tests.test_effort_commentaire || ""}
            onChange={(e) =>
              handleChange("test_effort_commentaire", e.target.value)
            }
            maxLength={500}
            placeholder="Exemple : Test effectué en centre médical, résultat VO2max 44 ml/kg/min..."
            rows={3} label={'Si oui, précisez le résultat'}
          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_effort_commentaire?.length || 0}/500
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsPhysiquesPrincipauxSection;
