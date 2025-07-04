import React from "react";
import FormSelect from "../common/FormSelect";
import { Fatigue1 } from "../../types/bilan";
import ImageWithModal from "../common/ImageWithModal";

interface FatigueSectionProps {
  fatigue: Fatigue1;
  onChange: (data: Fatigue1) => void;
}

const options = [
  { label: "1. Très facile", value: "1" },
  { label: "2. Facile", value: "2" },
  { label: "3. Moyennement facile", value: "3" },
  { label: "4. Modéré", value: "4" },
  { label: "5. Moyennement difficile", value: "5" },
  { label: "6. Difficile", value: "6" },
  { label: "7. Très difficile", value: "7" },
  { label: "8. Éprouvant", value: "8" },
  { label: "9. Extrême", value: "9" },
  { label: "10. Maximal", value: "10" },
];

const FatigueSection1: React.FC<FatigueSectionProps> = ({ fatigue, onChange }) => {
  const handleChange = (field: keyof Fatigue1, value: string) => {
    onChange({ ...fatigue, [field]: value });
  };

  return (
    <div className="space-y-4">
     

      <ImageWithModal
        src="/images/Exercice-sante-a-domicile-Echelle-de-borg.jpg.webp"
        alt="Échelle de Borg"
        className="w-full rounded shadow"
      />

      <FormSelect
        label="Test d’ÉQUILIBRE"
        options={options}
        value={fatigue.fatigue_equilibre || ""}
        onChange={(e) => handleChange("fatigue_equilibre", e.target.value)}
      />

      <FormSelect
        label="Test de SOUPLESSE"
        options={options}
        value={fatigue.fatigue_souplesse || ""}
        onChange={(e) => handleChange("fatigue_souplesse", e.target.value)}
      />

      <FormSelect
        label="Test de FORCE INF"
        options={options}
        value={fatigue.fatigue_force_inf || ""}
        onChange={(e) => handleChange("fatigue_force_inf", e.target.value)}
      />
    </div>
  );
};

export default FatigueSection1;
