import React, { useEffect, useState } from 'react';
import FormInput from '../common/FormInput';
import FormTextarea from '../common/FormTextarea';
import ImageWithModal from '../common/ImageWithModal';
import { Metabasal } from '../../types/bilan';
interface Props {
  metabasal: Metabasal;
  poids: number;
  taille: number;
  age: number;
  sexe: "Monsieur" | "Madame" | "Homme" | "Femme" | "Autre";
  onNapChange: (newMetabasal: Metabasal) => void;
}
const MetabolismeSection: React.FC<Props> = ({
  metabasal,
  poids,
  taille,
  age,
  sexe,
  onNapChange,
}) => {
  const [mt, setMt] = useState<number>(0);

  useEffect(() => {
    const tailleCm = taille;
    const poidsKg = poids;
    const ageYears = age;
    const sexeForCalculation: "Homme" | "Femme" | "Autre" = (
      sexe === "Monsieur" ? "Homme" : sexe === "Madame" ? "Femme" : "Autre"
    );

    let calculatedMb = 0;
    if (poidsKg && tailleCm && ageYears !== undefined && sexeForCalculation) {
      if (sexeForCalculation === "Homme") {
        calculatedMb = 66.5 + (13.75 * poidsKg) + (5.003 * tailleCm) - (6.755 * ageYears);
      } else if (sexeForCalculation === "Femme") {
        calculatedMb = 655.1 + (9.563 * poidsKg) + (1.850 * tailleCm) - (4.676 * ageYears);
      } else {
        calculatedMb = 66.5 + (13.75 * poidsKg) + (5.003 * tailleCm) - (6.673 * ageYears); // Fallback to Male formula
      }
    }
    calculatedMb = Math.round(calculatedMb);

    const calculatedMt = metabasal.nap
      ? Math.round(calculatedMb * metabasal.nap)
      : 0;
    setMt(calculatedMt);
  }, [poids, taille, age, sexe, metabasal.nap]);

  return (
    <div className="space-y-6">
      

      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#023047] uppercase">
          MÉTABOLISME BASAL (MB)
        </p>
        <ImageWithModal
          src="/images/image.png"
          alt="Tableau des NAP"
          className="w-full rounded-md shadow"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <FormInput
          label="MÉTABOLISME TOTAL"
          value={mt ? `${mt} kcal/jour` : ""}
          disabled
        />
        <FormInput
          label="NAP"
          type="number"
          value={metabasal.nap}
          onChange={(e) =>
            onNapChange({ ...metabasal, nap: parseFloat(e.target.value) })
          }
          min="1"
          step="0.1"
        />
        </div>
        <div>
        <FormTextarea
          label="Commentaire"
          value={metabasal.commentaire_metabolisme}
          onChange={(e) =>
            onNapChange({
              ...metabasal,
              commentaire_metabolisme: e.target.value,
            })
          }
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {metabasal.commentaire_metabolisme.length} / 500
        </div>
      </div>
    </div>
  );
};

export default MetabolismeSection;
