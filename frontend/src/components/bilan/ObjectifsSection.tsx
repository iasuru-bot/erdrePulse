import React from 'react';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import { Objectif } from '../../types/bilan';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ObjectifsSectionProps {
  objectifs: Objectif[];
  onObjectifsChange: (objectifs: Objectif[]) => void;
}

const OBJECTIF_OPTIONS = [
  { value: 'Améliorer la posture', label: 'Améliorer la posture' },
  { value: 'Prise de masse', label: 'Prise de masse' },
  { value: 'Préparer un marathon', label: 'Préparer un marathon' },
  { value: 'Perte de poids', label: 'Perte de poids' },
  { value: 'Remise en forme', label: 'Remise en forme' },
  { value: 'Autre', label: 'Autre' }
];

const ObjectifsSection: React.FC<ObjectifsSectionProps> = ({
  objectifs,
  onObjectifsChange
}) => {
  const handleObjectifChange = (index: number, field: keyof Objectif, value: string) => {
    const newObjectifs = [...objectifs];
    newObjectifs[index] = {
      ...newObjectifs[index],
      [field]: value,
      ...(field === 'titre' && value !== 'Autre' && { description: '' })
    };
    onObjectifsChange(newObjectifs);
  };

  const addObjectif = () => {
    if (objectifs.length < 3) {
      onObjectifsChange([...objectifs, { titre: '', description: '' }]);
    }
  };

  const removeObjectif = (index: number) => {
    const newObjectifs = objectifs.filter((_, i) => i !== index);
    onObjectifsChange(newObjectifs);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-2">
      </div>

      <div className="space-y-4">
        {objectifs.map((objectif, index) => (
          <div key={index} className="bg-[#F7F8FA] p-3 rounded-xl space-y-3 border border-[#E0E3E8]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-[#023047] tracking-widest uppercase">
                OBJECTIF {index + 1}{index === 0 && ' *'}
              </span>
              
                <button
                  type="button"
                  onClick={() => removeObjectif(index)}
                  className="text-black hover:text-black-500 bg-red-500 rounded-full p-1"
                  aria-label="Supprimer l'objectif"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              
            </div>
            <div className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-1">
              <FormSelect
                label="Titre de l'objectif"
                value={objectif.titre}
                onChange={e => handleObjectifChange(index, 'titre', e.target.value)}
                options={OBJECTIF_OPTIONS}
                className="w-full bg-[#F7F8FA] rounded-lg border border-[#E0E3E8] focus:ring-2 focus:ring-blue-200"
                required={index === 0}
              />
            </div>
            {objectif.titre === 'Autre' && (
              <div className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-1">
                <FormInput
                  label="Description de l'objectif personnalisé"
                  value={objectif.description || ''}
                  onChange={e => handleObjectifChange(index, 'description', e.target.value)}
                  placeholder="Décrivez votre objectif personnalisé..."
                  className="w-full bg-[#F7F8FA] rounded-lg border border-[#E0E3E8] focus:ring-2 focus:ring-blue-200"
                  required={index === 0}
                />
              </div>
            )}
          </div>
        ))}
        {objectifs.length < 3 && (
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={addObjectif}
              className="flex items-center gap-2 px-4 py-2 border border-[#023047] text-[#023047] bg-white rounded-full font-semibold text-sm hover:bg-[#023047] hover:text-white transition"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Ajouter un objectif
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectifsSection; 