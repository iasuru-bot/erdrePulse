import React, { useEffect, useState } from 'react';
import FormSelect from '../common/FormSelect';
import FormInput from '../common/FormInput';
import { profileService } from '../../services/api';
import { optionService } from '../../services/optionService';

interface InformationsProfessionnelles {
  secteur_activite: string;
  profession: string;
}

interface InformationsProfessionnellesProps {
  informationsProfessionnelles: InformationsProfessionnelles;
  onChange: (informationsProfessionnelles: InformationsProfessionnelles) => void;
}

interface Option {
  value: string;
  label: string;
}

const InformationsProfessionnellesSection: React.FC<InformationsProfessionnellesProps> = ({
  informationsProfessionnelles,
  onChange,
}) => {
  const [secteursOptions, setSecteursOptions] = useState<Option[]>([]);
  const [professionsOptions, setProfessionsOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [autreProfession, setAutreProfession] = useState('');

  // Charger les secteurs au montage du composant
  useEffect(() => {
    const fetchSecteurs = async () => {
      try {
        const secteurs = await profileService.getSecteurs();
        setSecteursOptions(secteurs);
      } catch (error) {
        console.error('Erreur lors du chargement des secteurs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecteurs();
  }, []);

  // Charger les professions quand le secteur change
  useEffect(() => {
    const fetchProfessions = async () => {
      if (!informationsProfessionnelles.secteur_activite) {
        setProfessionsOptions([]);
        return;
      }

      try {
        setLoading(true);
        const professions = await profileService.getProfessionsBySecteur(informationsProfessionnelles.secteur_activite);
        let formattedProfessions = professions.map((p: { value: string; label: string }) => ({ value: p.value, label: p.label }));
        
        // Filtrer pour éviter les doublons d'options "Autre"
        formattedProfessions = formattedProfessions.filter((p: Option) => p.value !== 'autre');
        
        // Ajouter l'option 'Autre' à la liste des professions
        formattedProfessions = [...formattedProfessions, { value: 'autre', label: 'Autre' }];
        setProfessionsOptions(formattedProfessions);
        
        // Réinitialiser la profession si elle n'est plus valide pour le nouveau secteur
        if (informationsProfessionnelles.profession && 
            !professions.some((p: Option) => p.value === informationsProfessionnelles.profession)) {
          onChange({
            ...informationsProfessionnelles,
            profession: ''
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des professions:', error);
        setProfessionsOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessions();
  }, [informationsProfessionnelles.secteur_activite]);

  const handleChange = (field: keyof InformationsProfessionnelles, value: any) => {
    let updatedData = {
      ...informationsProfessionnelles,
      [field]: value
    };

    // Si on change le secteur d'activité
    if (field === 'secteur_activite') {
      // Si on sélectionne "autre", on réinitialise la profession
      if (value === 'autre') {
        updatedData.profession = '';
      }
    }

    // Si on change la profession
    if (field === 'profession') {
      // Si on sélectionne "autre" comme profession
      if (value === 'autre') {
        updatedData.profession = 'autre';
        setAutreProfession(''); // Réinitialiser le champ autre profession
      } else {
        updatedData.profession = value;
        setAutreProfession(''); // Réinitialiser le champ autre profession
      }
    }

    onChange(updatedData);
  };

  const handleAutreProfessionChange = (value: string) => {
    setAutreProfession(value);
    // Ne pas mettre à jour informationsProfessionnelles.profession ici
    // pour éviter que le champ disparaisse
  };

  const handleAutreProfessionBlur = async () => {
    if (autreProfession.trim()) {
      try {
        // Sauvegarder la nouvelle profession
        const newProfession = await optionService.addNewProfession({
          profession: autreProfession.trim(),
          secteur: informationsProfessionnelles.secteur_activite
        });
        
        // Mettre à jour avec la valeur retournée par le serveur
        onChange({
          ...informationsProfessionnelles,
          profession: newProfession.value
        });
        
        // Recharger les professions pour inclure la nouvelle
        const professions = await profileService.getProfessionsBySecteur(informationsProfessionnelles.secteur_activite);
        let formattedProfessions = professions.map((p: { value: string; label: string }) => ({ value: p.value, label: p.label }));
        
        // Filtrer pour éviter les doublons d'options "Autre"
        formattedProfessions = formattedProfessions.filter((p: Option) => p.value !== 'autre');
        formattedProfessions = [...formattedProfessions, { value: 'autre', label: 'Autre' }];
        setProfessionsOptions(formattedProfessions);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la profession:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-[#023047] uppercase tracking-wider mb-2">Situation professionnelle</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Secteur d'activité */}
      <FormSelect
        label="Secteur d'activité"
        value={informationsProfessionnelles.secteur_activite}
        onChange={(e) => handleChange('secteur_activite', e.target.value)}
        options={secteursOptions}
        className="w-full bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200"
      />

      {/* Profession */}
      {informationsProfessionnelles.secteur_activite && (
        <>
          {informationsProfessionnelles.secteur_activite === 'autre' ? (
            <FormInput
              label="Profession"
              value={informationsProfessionnelles.profession}
              onChange={(e) => handleChange('profession', e.target.value)}
              placeholder="Entrez votre profession"
              className="w-full bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200"
            />
          ) : (
            <>
              <FormSelect
                label="Profession"
                value={informationsProfessionnelles.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
                options={professionsOptions}
                className="w-full bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200"
              />
              
              {/* Champ de saisie pour "Autre" profession */}
              {informationsProfessionnelles.profession === 'autre' && (
                <FormInput
                  label="Précisez votre profession"
                  value={autreProfession}
                  onChange={(e) => handleAutreProfessionChange(e.target.value)}
                  onBlur={handleAutreProfessionBlur}
                  placeholder="Entrez votre profession"
                  className="w-full bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200"
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InformationsProfessionnellesSection;
