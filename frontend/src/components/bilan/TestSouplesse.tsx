import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import { TestSouplesse } from '../../types/bilan';
import ImageWithModal from '../common/ImageWithModal';

interface TestsSectionProps {
  tests: TestSouplesse;
  onTestsChange: (tests: TestSouplesse) => void;
}

const TestsSouplesseSection: React.FC<TestsSectionProps> = ({
  tests,
  onTestsChange,
}) => {
  const handleChange = (field: keyof TestSouplesse, value: any) => {
    onTestsChange({
      ...tests,
      [field]: value
    });
  };
  return (
    <div className="space-y-6">
      {/* Test Souplesse */}
      <div className="space-y-4">
       

        <p className="text-sm text-[#023047] font-semibold">
          Flexion du tronc en avant
        </p>
        <ImageWithModal 
          src="/images/TEST_SOUPLESSE.png"
          alt="Tableau souplesse"
          className="w-full rounded shadow mb-4"
        />

        <FormInput
          label="Résultat"
          type="number"
          value={tests.test_souplesse_resultat || ""}
          onChange={(e) =>
            handleChange("test_souplesse_resultat", parseFloat(e.target.value))
          }
          placeholder="Indice ou niveau selon le tableau"
        />

        <div>
         
          <FormTextarea
            value={tests.test_souplesse_commentaire || ""}
            onChange={(e) => handleChange("test_souplesse_commentaire", e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Ex : Tu plies un peu les jambes en descendant, pense à bien garder tendu..." 
            label={'Commentaire'}          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_souplesse_commentaire?.length || 0}/500
          </div>
        </div>

        <div>
         
          <FormTextarea
            value={tests.test_souplesse_conseil || ""}
            onChange={(e) => handleChange("test_souplesse_conseil", e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Ex : Inclure des étirements des ischio-jambiers et du dos dans ta routine avant chaque séance." label={'Conseils pour progresser'}          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_souplesse_conseil?.length || 0}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsSouplesseSection;
