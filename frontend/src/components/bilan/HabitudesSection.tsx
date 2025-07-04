import React from 'react';
import FormInput from '../common/FormInput';
import FormCheckbox from '../common/FormCheckbox';
import FormRadioOuiNon from '../common/FormRadioOuiNon';
import { Habitudes } from '../../types/bilan';

interface HabitudesSectionProps {
  santeVie: Habitudes;
  onSanteVieChange: (santeVie: Habitudes) => void;
}

const HabitudesSection: React.FC<HabitudesSectionProps> = ({
  santeVie,
  onSanteVieChange
}) => {
  const handleChange = (field: keyof Habitudes, value: any) => {
    onSanteVieChange({
      ...santeVie,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Fumeur */}
      <div className="mb-6">
        <p className="text-[#023047] font-bold text-sm uppercase mb-2">
          Fumeur
        </p>

        <p className="text-[#023047] font-medium text-sm mb-2">Fumez-vous ?</p>

        <div className="flex items-center gap-6">
          <FormRadioOuiNon
            value={santeVie.fumeur}
            onChange={(val) => handleChange("fumeur", val)}
          />
        </div>
      </div>

      {/* Consommation d'alcool */}
      <div className="mb-6">
        <p className="text-[#023047] font-bold text-sm uppercase mb-2">
          Consommation d'alcool
        </p>

        <p className="text-[#023047] font-medium text-sm mb-2">
          Consommez-vous de l'alcool dans la semaine ?
        </p>

        <div className="flex items-center gap-6">
          <FormRadioOuiNon
            value={santeVie.consommation_alcool}
            onChange={(val) => handleChange("consommation_alcool", val)}
          />
        </div>

        {santeVie.consommation_alcool === true && (
          <>
            <FormInput
              label="SI OUI, PRÉCISEZ"
              value={santeVie.alcool_details || ""}
              onChange={(e) =>
                handleChange("alcool_details", e.target.value.slice(0, 250))
              }
              maxLength={250}
              placeholder="Ex : 2 verres le week-end"
              className="mt-2"
            />
            <div className="text-xs text-right text-gray-500">
              {santeVie.alcool_details?.length || 0}/250
            </div>
          </>
        )}
        <FormInput
          label="INDICATEUR"
          value={santeVie.alcool_indicateur || ""}
          onChange={(e) =>
            handleChange("alcool_indicateur", e.target.value.slice(0, 250))
          }
          maxLength={250}
          placeholder="Risque modéré à surveiller, consommation excessive, etc."
          className="mt-4"
        />
        <div className="text-xs text-right text-gray-500">
          {santeVie.alcool_indicateur?.length || 0}/250
        </div>
      </div>
    </div>
  );
};

export default HabitudesSection; 