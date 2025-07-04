import React, { useEffect } from 'react';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import { InfosGenerales } from '../../types/bilan';


interface InfosPersonnellesProps {
  infos: InfosGenerales;
  onChange: (infos: InfosGenerales) => void;
  
}

const CIVILITY_OPTIONS = [
  { value: 'Monsieur', label: 'Monsieur' },
  { value: 'Madame', label: 'Madame' },
  { value: 'Autre', label: 'Autre' }
];

const InfosPersonnellesSection: React.FC<InfosPersonnellesProps> = ({ infos, onChange }) => {
  const calculerAge = (dateNaissance: string): number | undefined => {
    if (!dateNaissance) return undefined;
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculer l'âge au premier rendu si une date de naissance est présente
  useEffect(() => {
    if (infos.date_naissance && !infos.age) {
      const age = calculerAge(infos.date_naissance);
      if (age !== undefined) {
        onChange({ ...infos, age });
      }
    }
  }, []);

  const handleChange = (field: keyof InfosGenerales, value: any) => {
    let updatedInfos = { ...infos, [field]: value };

    if (field === 'date_naissance') {
      const age = calculerAge(value);
      if (age !== undefined) {
        updatedInfos.age = age;
      }
    }

    onChange(updatedInfos);
  };

  return (
    <div className="space-y-6">

      <FormSelect
        label="Civilité"
        value={infos.civility}
        onChange={e => handleChange('civility', e.target.value)}
        options={CIVILITY_OPTIONS}
        placeholder="Sélectionnez une civilité"
        className="w-full"
      />

      <FormInput
        label="Date de naissance"
        type="date"
        value={infos.date_naissance}
        onChange={e => handleChange('date_naissance', e.target.value)}
        className="w-full"
      />

      <FormInput
        label="Âge"
        type="number"
        value={infos.age || ''}
        readOnly
        className="w-full bg-gray-100 cursor-not-allowed"
      />

      <FormInput
        label="Adresse"
        value={infos.adresse}
        onChange={e => handleChange('adresse', e.target.value)}
        className="w-full"
      />

      <FormInput
        label="Complément d'adresse"
        value={infos.complement_adresse || ''}
        onChange={e => handleChange('complement_adresse', e.target.value)}
        className="w-full"
      />

      <FormInput
        label="Code postal"
        value={infos.code_postal}
        onChange={e => handleChange('code_postal', e.target.value)}
        className="w-full"
      />

      <FormInput
        label="Ville"
        value={infos.ville}
        onChange={e => handleChange('ville', e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default InfosPersonnellesSection;
