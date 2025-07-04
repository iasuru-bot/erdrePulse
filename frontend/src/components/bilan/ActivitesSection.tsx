import React from 'react';
import FormSelect from '../common/FormSelect';
import FormTextarea from '../common/FormTextarea';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Activite } from '../../types/bilan';


interface ActivitesSectionProps {
  activites: Activite[];
  commentaire: string;
  onActivitesChange: (activites: Activite[]) => void;
  onCommentaireChange: (commentaire: string) => void;
}

const TYPE_OPTIONS = [
  { value: 'hiit', label: 'HIIT' },
  { value: 'crosstraining', label: 'Crosstraining' },
  { value: 'cardio_boxing', label: 'Cardio boxing' },
  { value: 'body_sculpt', label: 'Body sculpt' },
  { value: 'renfo_haut', label: 'Renfo haut du corps' },
  { value: 'renfo_abdos', label: 'Renfo abdos' },
  { value: 'renfo_bas', label: 'Renfo bas du corps' },
  { value: 'hatha_yoga', label: 'Hatha Yoga' },
  { value: 'vinyasa_yoga', label: 'Vinyasa Yoga' },
  { value: 'yin_yoga', label: 'Yin Yoga' },
  { value: 'yoga_aerien', label: 'Yoga aérien' },
  { value: 'pilates_matwork', label: 'Pilates (matwork)' },
  { value: 'pilates_n1', label: 'Pilates niveau 1 (petit matériel)' },
  { value: 'pilates_n2', label: 'Pilates niveau 2 (Springboard)' },
  { value: 'natation', label: 'Natation' },
  { value: 'velo', label: 'Vélo' },
  { value: 'marche', label: 'Marche' },
  { value: 'marche_nordique', label: 'Marche nordique' },
  { value: 'course_pied', label: 'Course à pied' },
  { value: 'entrainement_libre', label: 'Entraînement libre' }
];

const FREQUENCE_OPTIONS = [
  { value: '1', label: '1 fois par semaine' },
  { value: '2', label: '2 fois par semaine' },
  { value: '3', label: '3 fois par semaine' },
  { value: '4', label: '4 fois par semaine' },
  { value: '5', label: '5 fois par semaine' },
  { value: '6', label: '6 fois par semaine' },
  { value: '7', label: '7 fois par semaine' }
];

const ActivitesSection: React.FC<ActivitesSectionProps> = ({
  activites,
  commentaire,
  onActivitesChange,
  onCommentaireChange
}) => {
  const handleAddActivite = (estOptionnelle: boolean = false) => {
    if (activites.length < 4) {
      onActivitesChange([
        ...activites,
        {
          type: '',
          frequence: '',
          estOptionnelle
        }
      ]);
    }
  };

  const handleRemoveActivite = (index: number) => {
    const newActivites = activites.filter((_, i) => i !== index);
    onActivitesChange(newActivites);
  };

  const handleActiviteChange = (index: number, field: keyof Activite, value: string) => {
    const newActivites = activites.map((act, i) => {
      if (i === index) {
        return {
          ...act,
          [field]: value
        };
      }
      return act;
    });
    onActivitesChange(newActivites);
  };

  const activitesPrincipales = activites.filter(a => !a.estOptionnelle);
  const activiteOptionnelle = activites.find(a => a.estOptionnelle);
  const activiteOptionnelleIndex = activites.findIndex(a => a.estOptionnelle);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center mb-2">
        <h2 className="text-xl font-bold text-[#023047] uppercase tracking-wider mb-2 text-center">Activités physiques</h2>
      </div>

      {/* Activités principales */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-2">Activités principales</h3>
        {activitesPrincipales.map((activite, index) => (
          <div key={`main-${index}`} className="bg-[#F7F8FA] p-3 rounded-xl space-y-3 border border-[#E0E3E8]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-[#023047] tracking-widest uppercase">ACTIVITÉ {index + 1}</span>
              <button
                type="button"
                onClick={() => handleRemoveActivite(activites.indexOf(activite))}
                className="text-black hover:text-black-500 bg-red-500 rounded-full p-1"
                aria-label="Supprimer l'activité"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-1">
              <FormSelect
                label="Type d'activité"
                value={activite.type}
                onChange={e => handleActiviteChange(activites.indexOf(activite), 'type', e.target.value)}
                options={TYPE_OPTIONS}
                className="w-full bg-[#F7F8FA] rounded-lg border border-[#E0E3E8] focus:ring-2 focus:ring-blue-200"
                required
                placeholder="Choisissez un type d'activité"
              />
            </div>
            <div className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-1">
              <FormSelect
                label="Nombre de séance/semaine"
                value={activite.frequence}
                onChange={e => handleActiviteChange(activites.indexOf(activite), 'frequence', e.target.value)}
                options={FREQUENCE_OPTIONS.map(opt => ({...opt, label: `${opt.value} séance${opt.value === '1' ? '' : 's'}/semaine`}))}
                className="w-full bg-[#F7F8FA] rounded-lg border border-[#E0E3E8] focus:ring-2 focus:ring-blue-200"
                required
                placeholder="Choisissez une fréquence"
              />
            </div>
          </div>
        ))}
        {activitesPrincipales.length < 3 && (
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={() => handleAddActivite(false)}
              className="flex items-center gap-2 px-4 py-2 border border-[#023047] text-[#023047] bg-white rounded-full font-semibold text-sm hover:bg-[#023047] hover:text-white transition"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Ajouter une activité
            </button>
          </div>
        )}
      </div>

      {/* Activité optionnelle */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-2">Activité optionnelle</h3>
        {activiteOptionnelle ? (
          <div key="optionnelle" className="bg-[#F7F8FA] p-3 rounded-xl space-y-3 border border-[#E0E3E8]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-[#023047] tracking-widest uppercase">ACTIVITÉ OPTIONNELLE</span>
              <button
                type="button"
                onClick={() => handleRemoveActivite(activiteOptionnelleIndex)}
                className="text-black hover:text-black-500 bg-red-500 rounded-full p-1"
                aria-label="Supprimer l'activité optionnelle"
              >
                <TrashIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-1">
              <FormSelect
                label="Type d'activité"
                value={activiteOptionnelle.type}
                onChange={e => handleActiviteChange(activiteOptionnelleIndex, 'type', e.target.value)}
                options={TYPE_OPTIONS}
                className="w-full bg-[#F7F8FA] rounded-lg border border-[#E0E3E8] focus:ring-2 focus:ring-blue-200"
                required
                placeholder="Choisissez un type d'activité"
              />
            </div>
            <div className="text-xs font-semibold text-[#023047] uppercase tracking-widest mb-1">
              <FormSelect
                label="Nombre de séance/semaine"
                value={activiteOptionnelle.frequence}
                onChange={e => handleActiviteChange(activiteOptionnelleIndex, 'frequence', e.target.value)}
                options={FREQUENCE_OPTIONS.map(opt => ({...opt, label: `${opt.value} séance${opt.value === '1' ? '' : 's'}/semaine`}))}
                className="w-full bg-[#F7F8FA] rounded-lg border border-[#E0E3E8] focus:ring-2 focus:ring-blue-200"
                required
                placeholder="Choisissez une fréquence"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={() => handleAddActivite(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#023047] text-[#023047] bg-white rounded-full font-semibold text-sm hover:bg-[#023047] hover:text-white transition"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Ajouter une activité optionnelle
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-xs font-semibold text-[#023047] uppercase tracking-widest mb-1">
        <FormTextarea
          label="Commentaire"
          value={commentaire}
          onChange={e => onCommentaireChange(e.target.value)}
          placeholder="Ajoutez un commentaire général sur le programme d'activités..."
          className="w-full bg-[#F7F8FA] rounded-lg border border-[#E0E3E8] focus:ring-2 focus:ring-blue-200"
          rows={4}
        />
      </div>
    </div>
  );
};

export default ActivitesSection; 