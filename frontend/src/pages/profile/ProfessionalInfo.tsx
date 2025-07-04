import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { profileService } from '../../services/api';
import { optionService } from '../../services/optionService';

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

interface FormData {
  activite_professionnelle: string;
  secteur_activite: string;
  user: {
    firstName: string;
    lastName: string;
  }
}

const ProfessionalInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    activite_professionnelle: '',
    secteur_activite: '',
    user: {
      firstName: '',
      lastName: '',
    }
  });

  const [professions, setProfessions] = useState<any[]>([]);
  const [secteurs, setSecteurs] = useState<any[]>([]);
  const [autreProfession, setAutreProfession] = useState('');

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const [initialData, setInitialData] = useState<FormData | null>(null);

  useEffect(() => {
    loadProfile();
    fetchSecteurs();
  }, []);

  useEffect(() => {
    if (formData.secteur_activite && formData.secteur_activite !== 'autre') {
      fetchProfessionsBySecteur(formData.secteur_activite);
    } else {
      setProfessions([]);
    }
  }, [formData.secteur_activite]);

  const loadProfile = async () => {
    try {
      const profile = await profileService.getProfile();
      const data: FormData = {
        activite_professionnelle: profile.activite_professionnelle || '',
        secteur_activite: profile.secteur_activite || '',
        user: {
          firstName: profile.user.firstName || '',
          lastName: profile.user.lastName || '',
        },
      };
      setFormData(data);
      setInitialData(data);
      if (data.secteur_activite && data.secteur_activite !== 'autre') {
        await fetchProfessionsBySecteur(data.secteur_activite);
      } else {
        setProfessions([]);
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erreur lors du chargement du profil',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSecteurs = async () => {
    try {
      const secteursData = await profileService.getSecteurs();
      setSecteurs(secteursData);
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erreur lors du chargement des secteurs',
        severity: 'error'
      });
    }
  };

  const fetchProfessionsBySecteur = async (secteur: string) => {
    try {
      const professionsData = await profileService.getProfessionsBySecteur(secteur);
      
      // Filtrer pour éviter les doublons d'options "Autre"
      const filteredProfessions = professionsData.filter((p: any) => p.value !== 'autre');
      setProfessions(filteredProfessions);
      
      // Réinitialiser la profession si elle n'est plus valide pour le nouveau secteur
      if (formData.activite_professionnelle && 
          !professionsData.some((p: any) => p.value === formData.activite_professionnelle)) {
        setFormData(prev => ({
          ...prev,
          activite_professionnelle: '',
        }));
      }
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erreur lors du chargement des professions',
        severity: 'error'
      });
    }
  };

  const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Si on change la profession et qu'on sélectionne "autre", réinitialiser le champ autre profession
    if (field === 'activite_professionnelle') {
      if (event.target.value === 'autre') {
        setAutreProfession('');
      } else {
        setAutreProfession('');
      }
    }
  };

  const handleAutreProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutreProfession(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let updatedFormData = { ...formData };
      
      // Si on a sélectionné "autre" comme secteur et qu'on a entré un autre secteur
      if (formData.secteur_activite === 'autre') {
        try {
          // Créer la nouvelle profession avec le secteur comme valeur
          const newProfession = await optionService.addNewProfession({
            profession: formData.activite_professionnelle
          });
          
          // Mettre à jour les données du formulaire
          updatedFormData = {
            ...updatedFormData,
            activite_professionnelle: newProfession.value,
            secteur_activite: 'autre' // On garde le secteur en "autre"
          };
        } catch (error: any) {
          console.error('=== ERREUR lors de l\'ajout de la nouvelle profession ===');
          console.error('Erreur détaillée:', error);
          if (error.response) {
            console.error('Réponse du serveur:', error.response.data);
          }
          throw error; // On propage l'erreur pour l'afficher à l'utilisateur
        }
      }
      // Si on a sélectionné "autre" comme profession dans un secteur normal
      else if (formData.activite_professionnelle === 'autre' && autreProfession.trim()) {
        try {
          const newProfession = await optionService.addNewProfession({
            profession: autreProfession.trim(),
            secteur: formData.secteur_activite
          });
          
          updatedFormData = {
            ...updatedFormData,
            activite_professionnelle: newProfession.value,
          };
        } catch (error: any) {
          console.error('=== ERREUR lors de l\'ajout de la nouvelle profession ===');
          console.error('Erreur détaillée:', error);
          if (error.response) {
            console.error('Réponse du serveur:', error.response.data);
          }
          throw error;
        }
      }

      // Mise à jour du profil avec les données mises à jour
      const updatedProfile = await profileService.updateProfile(updatedFormData);
      
      setAlert({
        open: true,
        message: 'Profil mis à jour avec succès',
        severity: 'success'
      });

      // Recharger les professions pour inclure la nouvelle
      if (updatedFormData.secteur_activite) {
        await fetchProfessionsBySecteur(updatedFormData.secteur_activite);
      }

      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error: any) {
      console.error('Erreur détaillée:', error);
      if (error.response) {
        console.error('Réponse du serveur:', error.response.data);
      }
      setAlert({
        open: true,
        message: 'Erreur lors de la mise à jour du profil',
        severity: 'error'
      });
    }
  };

  const isFormChanged = () => {
    if (!initialData) return false;
    
    // Vérifier si les champs principaux ont changé
    const mainFieldsChanged = (
      formData.activite_professionnelle !== initialData.activite_professionnelle ||
      formData.secteur_activite !== initialData.secteur_activite
    );
    
    // Si on a sélectionné "autre" comme profession et qu'on a saisi quelque chose
    const autreProfessionChanged = (
      formData.activite_professionnelle === 'autre' && 
      autreProfession.trim() !== ''
    );
    
    return mainFieldsChanged || autreProfessionChanged;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-primary hover:bg-gray-100 rounded-full transition-colors bg-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-3xl font-medium">
              {formData.user.firstName.charAt(0)}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-semibold text-primary">
            {formData.user.firstName} {formData.user.lastName}
          </h2>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              SECTEUR D'ACTIVITÉ
            </label>
            <select
              value={formData.secteur_activite}
              onChange={handleChange('secteur_activite')}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary appearance-none"
            >
              <option value="">Sélectionnez un secteur</option>
              {secteurs.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {formData.secteur_activite === 'autre' && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                AUTRE SECTEUR
              </label>
              <input
                type="text"
                value={formData.activite_professionnelle || ''}
                onChange={handleChange('activite_professionnelle')}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
                placeholder="Précisez le secteur d'activité"
              />
            </div>
          )}

          {formData.secteur_activite && formData.secteur_activite !== 'autre' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  PROFESSION
                </label>
                <select
                  value={formData.activite_professionnelle}
                  onChange={handleChange('activite_professionnelle')}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary appearance-none"
                >
                  <option value="">Sélectionnez une profession</option>
                  {professions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Champ de saisie pour "Autre" profession */}
              {formData.activite_professionnelle === 'autre' && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    PRÉCISEZ VOTRE PROFESSION
                  </label>
                  <input
                    type="text"
                    value={autreProfession}
                    onChange={handleAutreProfessionChange}
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
                    placeholder="Entrez votre profession"
                  />
                </div>
              )}
            </>
          )}

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFormChanged()}
            >
              Enregistrer
            </button>
          </div>
        </form>

        {alert.open && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-md ${
            alert.severity === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {alert.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalInfo; 