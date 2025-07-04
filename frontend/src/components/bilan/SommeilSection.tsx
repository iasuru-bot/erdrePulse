import React from 'react';
import FormSelect from '../common/FormSelect';
import FormCheckbox from '../common/FormCheckbox';
import FormTextarea from '../common/FormTextarea';
import FormRadioOuiNon from '../common/FormRadioOuiNon';
import { Sommeil } from '../../types/bilan';



interface SommeilSectionProps {
  santeVie: Sommeil;
  onSanteVieChange: (santeVie: Sommeil) => void;
}

const HEURES_SOMMEIL_OPTIONS = [
  { value: 'Moins de 6 heures', label: 'Moins de 6 heures' },
  { value: '6-7 heures', label: '6-7 heures' },
  { value: '7-8 heures', label: '7-8 heures' },
  { value: '8-9 heures', label: '8-9 heures' },
  { value: 'Plus de 9 heures', label: 'Plus de 9 heures' }
];
const REPAS_OPTIONS = [
  { value: '1 repas/jour', label: '1 repas/jour' },
  { value: '2 repas/jour', label: '2 repas/jour' },
  { value: '3 repas/jour', label: '3 repas/jour' },
  { value: '+ de 3 repas/jour', label: '+ de 3 repas/jour' }
];
const PETIT_DEJ_OPTIONS = [
  { value: 'Toujours', label: 'Toujours' },
  { value: 'Parfois', label: 'Parfois' },
  { value: 'Jamais', label: 'Jamais' }
];

const SommeilSection: React.FC<SommeilSectionProps> = ({
  santeVie,
  onSanteVieChange
}) => {
  const handleChange = (field: keyof Sommeil, value: any) => {
    onSanteVieChange({
      ...santeVie,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Sommeil et repas */}
      <div className="mb-2 flex flex-col gap-2">
        <FormSelect
          label="Nombre d'heures de sommeil"
          value={santeVie.nb_heures_sommeil}
          onChange={e => handleChange('nb_heures_sommeil', e.target.value)}
          options={HEURES_SOMMEIL_OPTIONS}
          className="w-full bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200"
          required
        />
        <FormSelect
          label="Nombre de repas par jour"
          value={santeVie.nb_repas}
          onChange={e => handleChange('nb_repas', e.target.value)}
          options={REPAS_OPTIONS}
          className="w-full bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200"
          required
        />
        <FormSelect
          label="Prenez-vous un petit déjeuner ?"
          value={santeVie.petit_dejeuner || ''}
          onChange={e => handleChange('petit_dejeuner', e.target.value)}
          options={PETIT_DEJ_OPTIONS}
          className="w-full bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200"
          required
        />

        {/* Collation */}
        <div className="mb-6">
          <p className="text-[#023047] font-bold text-sm uppercase mb-2">
            Collation entre les repas
          </p>

          <div className="flex items-center gap-6">
            <FormRadioOuiNon
              value={santeVie.collation}
              onChange={(val) => handleChange('collation', val)}
            />
          </div>

          {santeVie.collation === true && (
            <FormTextarea
              label="Si oui, précisez"
              value={santeVie.collation_details || ''}
              onChange={(e) => handleChange('collation_details', e.target.value)}
              maxLength={250}
              rows={2}
              placeholder="Ex : fruits, barres, sucrés..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SommeilSection;