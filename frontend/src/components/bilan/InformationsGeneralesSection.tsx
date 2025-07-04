import React, { useEffect, useState } from 'react';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import { InfosGenerales } from '../../types/bilan';

interface Props {
  infos: InfosGenerales;
  onChange: (infos: InfosGenerales) => void;
}

const ACTIVITE_OPTIONS = [
  { value: '0-1', label: '0 - 1 jour/semaine' },
  { value: '2-3', label: '2 - 3 jours/semaine' },
  { value: '4+', label: '4+ jours/semaine' },
];

const InformationsGeneralesSection: React.FC<Props> = ({ infos, onChange }) => {
  const [localInfos, setLocalInfos] = useState<InfosGenerales>(infos);

  useEffect(() => {
    const { taille, poids } = localInfos;

    if (
      taille &&
      poids &&
      taille >= 100 &&
      taille <= 250 &&
      poids >= 20 &&
      poids <= 300
    ) {
      const tailleM = taille / 100;
      const imc = parseFloat((poids / (tailleM * tailleM)).toFixed(1));
      let interpretation = '';

      if (imc <= 18.5) interpretation = 'Résultat : IMC est ≤ 18.5';
      else if (imc <= 24.9) interpretation = 'Résultat : IMC est entre 18.5 – 24.9';
      else interpretation = 'Résultat : IMC est de 25+';

      const updated = { ...localInfos, imc, interpretation };
      setLocalInfos(updated);
      onChange(updated);
    }
  }, [localInfos.taille, localInfos.poids]);

  const handleChange = (field: keyof InfosGenerales, value: any) => {
    const updated = { ...localInfos, [field]: value };
    setLocalInfos(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormInput
            label="TAILLE (CM)"
            type="number"
            value={localInfos.taille ?? ''}
            onChange={(e) => handleChange('taille', parseInt(e.target.value))}
            min="100"
            max="250"
            required
          />
          <small className="text-xs text-gray-500">
            Utilisé uniquement pour calculer votre IMC dans le cadre du bilan santé.
          </small>
        </div>

        <div>
          <FormInput
            label="POIDS (KG)"
            type="number"
            value={localInfos.poids ?? ''}
            onChange={(e) => handleChange('poids', parseFloat(e.target.value))}
            min="20"
            max="300"
            step="0.1"
            required
          />
          <small className="text-xs text-gray-500">
            Utilisé uniquement pour calculer votre IMC dans le cadre du bilan santé.
          </small>
        </div>
      </div>

      <div>
        <FormInput
          label="IMC"
          type="number"
          value={localInfos.imc ?? ''}
          disabled
        />
        {localInfos.interpretation && (
          <p className="text-sm text-[#023047] font-semibold">
            {localInfos.interpretation}
          </p>
        )}
        <small className="text-xs text-gray-500">
          Utilisé uniquement dans le cadre du bilan santé.
        </small>
      </div>

      
      <FormSelect
        label="NIVEAU D’ACTIVITÉ PHYSIQUE"
        value={localInfos.activite || ''}
        onChange={(e) => handleChange('activite', e.target.value)}
        options={ACTIVITE_OPTIONS}
        required
      />
    </div>
  );
};

export default InformationsGeneralesSection;
