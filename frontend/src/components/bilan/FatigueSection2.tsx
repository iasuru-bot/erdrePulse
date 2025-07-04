import React from "react";
import FormSelect from "../common/FormSelect";
import FormTextarea from "../common/FormTextarea";
import { Fatigue2 } from "../../types/bilan";


interface FatigueSectionProps {
  fatigue: Fatigue2;
  onChange: (data: Fatigue2) => void;
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

const FatigueSection2: React.FC<FatigueSectionProps> = ({ fatigue, onChange }) => {
  const handleChange = (field: keyof Fatigue2, value: string) => {
    onChange({ ...fatigue, [field]: value });
  };

  return (
    <div className="space-y-4">
      
      <FormSelect
        label="Test de FORCE SUP"
        options={options}
        value={fatigue.fatigue_force_sup || ""}
        onChange={(e) => handleChange("fatigue_force_sup", e.target.value)}
      />

      <FormSelect
        label="Test d’ENDURANCE"
        options={options}
        value={fatigue.fatigue_endurance || ""}
        onChange={(e) => handleChange("fatigue_endurance", e.target.value)}
      />

      <FormSelect
        label="Test VMA"
        options={options}
        value={fatigue.fatigue_vma || ""}
        onChange={(e) => handleChange("fatigue_vma", e.target.value)}
      />

      <FormTextarea
        label="Commentaire"
        value={fatigue.fatigue_commentaire || ""}
        onChange={(e) => handleChange("fatigue_commentaire", e.target.value)}
        maxLength={500}
        rows={3}
        placeholder="Ex : Sensation de fatigue progressive sur l’ensemble des tests."
      />
    </div>
  );
};

export default FatigueSection2;
