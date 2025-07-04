import FormInput from "../common/FormInput";
import FormTextarea from "../common/FormTextarea";
import { TestsEquilibres } from "../../types/bilan";
import ImageWithModal from "../common/ImageWithModal";

interface TestsSectionProps {
  tests: TestsEquilibres;
  onTestsChange: (tests: TestsEquilibres) => void;
}

const TestsEquilibreSection: React.FC<TestsSectionProps> = ({
  tests,
  onTestsChange,
}) => {
  const handleChange = (field: keyof TestsEquilibres, value: any) => {
    onTestsChange({
      ...tests,
      [field]: value,
    });
  };
  return (
    <div className="space-y-6">
      {/* Test d'équilibre */}
      <div className="space-y-4">
       
        <p className="text-sm text-[#023047] font-semibold">
          Équilibre sur une jambe
        </p>
        <ImageWithModal
          src="/images/TESTE_EQUILIBRE.png"
          alt="Tableau équilibre"
          className="w-full rounded shadow mb-4"
        />
       

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Jambe droite (sec)"
            type="number"
            value={tests.test_equilibre_1 || ""}
            onChange={(e) =>
              handleChange("test_equilibre_1", parseFloat(e.target.value))
            }
          />
          <FormInput
            label="Jambe gauche (sec)"
            type="number"
            value={tests.test_equilibre_2 || ""}
            onChange={(e) =>
              handleChange("test_equilibre_2", parseFloat(e.target.value))
            }
          />
        </div>

        <FormInput
          label="Résultat"
          value={tests.test_equilibre_resultat || ""}
          onChange={(e) =>
            handleChange("test_equilibre_resultat", e.target.value)
          }
          placeholder="Indice déterminé par le coach"
        />

        <div>
          <FormTextarea
            value={tests.test_equilibre_commentaire || ""}
            onChange={(e) => handleChange("test_equilibre_commentaire", e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Ex : Tu es dans la moyenne haute pour ta tranche d'âge." label={"Commentaire"}          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_equilibre_commentaire?.length || 0}/500
          </div>
        </div>

        <div>
          <FormTextarea
            value={tests.test_equilibre_conseil || ""}
            onChange={(e) =>
              handleChange("test_equilibre_conseil", e.target.value)
            }
            maxLength={500}
            rows={3}
            placeholder="Ex : Travaille ton gainage et ta proprioception pour améliorer ta stabilité." label={'Conseils pour progresser'}          />
          <div className="text-xs text-right text-gray-500">
            {tests.test_equilibre_conseil?.length || 0}/500
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsEquilibreSection;
