import React from 'react';
import FormCheckbox from '../common/FormCheckbox';
import FormInput from '../common/FormInput';
import FormRadioOuiNon from '../common/FormRadioOuiNon';
import { Symptomes } from '../../types/bilan';



interface SymptomeProps {
  santeVie: Symptomes;
  onSanteVieChange: (santeVie: Symptomes) => void;
}



const SymptomeOuDouleurSection: React.FC<SymptomeProps> = ({
  santeVie,
  onSanteVieChange
}) => {
  const handleChange = (field: keyof Symptomes, value: any) => {
    onSanteVieChange({
      ...santeVie,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Douleurs thoraciques */}
      <div className="mb-6">
        <p className="text-[#023047] font-bold text-sm uppercase mb-2">
          Douleurs thoraciques
        </p>

        <p className="text-[#023047] font-medium text-sm mb-2">
          Avez-vous des douleurs thoraciques à l'effort ?
        </p>

        <div className="flex items-center gap-6">
          <FormRadioOuiNon
            value={santeVie.douleurs_thoraciques}
            onChange={(val) => handleChange("douleurs_thoraciques", val)}
          />
        </div>
         {santeVie.douleurs_thoraciques === true && (
          <FormInput
            label="SI OUI, PRÉCISEZ"
            value={santeVie.douleurs_thoraciques_precisions || ""}
            onChange={(e) =>
              handleChange("douleurs_thoraciques_precisions", e.target.value)
            }
            placeholder="Ex : fracture, chirurgie, etc."
            className="mt-2"
          />
        )}
      </div>

      {/* Douleurs chroniques */}
      <div className="mb-6">
        <p className="text-[#023047] font-bold text-sm uppercase mb-2">
          Douleurs chroniques
        </p>

        <p className="text-[#023047] font-medium text-sm mb-2">
          Souffrez-vous de douleurs chroniques ?
        </p>

        <div className="flex items-center gap-6">
          <FormRadioOuiNon
            value={santeVie.douleurs_chroniques}
            onChange={(val) => handleChange("douleurs_chroniques", val)}
          />
        </div>
      </div>
       {santeVie.douleurs_chroniques === true && (
          <FormInput
            label="SI OUI, PRÉCISEZ"
            value={santeVie.douleurs_chroniques_precisions || ""}
            onChange={(e) =>
              handleChange("douleurs_chroniques_precisions", e.target.value)
            }
            placeholder="Ex : fracture, chirurgie, etc."
            className="mt-2"
          />
        )}
    </div>
  );
};

export default SymptomeOuDouleurSection; 