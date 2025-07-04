import React from 'react';
import FormInput from '../common/FormInput';
import FormRadioOuiNon from '../common/FormRadioOuiNon';
import { Antecedents } from '../../types/bilan';


interface AntecedentsMedicauxSectionProps {
  santeVie: Antecedents;
  onSanteVieChange: (santeVie: Antecedents) => void;
}


const AntecedentsMedicauxSection: React.FC<AntecedentsMedicauxSectionProps> = ({
  santeVie,
  onSanteVieChange
}) => {
  const handleChange = (field: keyof Antecedents, value: any) => {
    onSanteVieChange({
      ...santeVie,
      [field]: value
    });
  };

  
  return (
    <div className="space-y-6">
      {/* Antécédents médicaux */}
      <div className="mb-6">
        <p className="text-[#023047] font-medium text-sm mb-2">
          Avez-vous des antécédents médicaux ?
        </p>

        <div className="flex items-center gap-6">
          <FormRadioOuiNon
            value={santeVie.antecedents_medicaux}
            onChange={(val) => handleChange("antecedents_medicaux", val)}
          />
        </div>

        {santeVie.antecedents_medicaux === true && (
          <FormInput
            label="SI OUI, PRÉCISEZ"
            value={santeVie.antecedents_medicaux_precisions || ""}
            onChange={(e) =>
              handleChange("antecedents_medicaux_precisions", e.target.value)
            }
            placeholder="Ex : asthme, diabète, etc."
            className="mt-2"
          />
        )}
      </div>

      {/* Opérations et accidents */}
      <div className="mb-6">
        <p className="text-[#023047] font-medium text-sm mb-2">
          Avez-vous déjà eu un accident ou une opération ?
        </p>

        <div className="flex items-center gap-6">
          <FormRadioOuiNon
            value={santeVie.operations_accidents}
            onChange={(val) => handleChange("operations_accidents", val)}
          />
        </div>

        {santeVie.operations_accidents === true && (
          <FormInput
            label="SI OUI, PRÉCISEZ"
            value={santeVie.operations_accidents_precisions || ""}
            onChange={(e) =>
              handleChange("operations_accidents_precisions", e.target.value)
            }
            placeholder="Ex : fracture, chirurgie, etc."
            className="mt-2"
          />
        )}
      </div>
      {/* Traitements actuels */}
      <div className="mb-6">
        <p className="text-[#023047] font-medium text-sm mb-2">
          Suivez-vous un traitement médical actuellement ?
        </p>

        <div className="flex items-center gap-6">
          <FormRadioOuiNon
            value={santeVie.traitements_actuels}
            onChange={(val) => handleChange("traitements_actuels", val)}
          />
        </div>

        {santeVie.traitements_actuels === true && (
          <FormInput
            label="SI OUI, PRÉCISEZ"
            value={santeVie.traitements_actuels_precisions || ""}
            onChange={(e) =>
              handleChange("traitements_actuels_precisions", e.target.value)
            }
            placeholder="Ex : traitement pour le cholestérol..."
            className="mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default AntecedentsMedicauxSection; 