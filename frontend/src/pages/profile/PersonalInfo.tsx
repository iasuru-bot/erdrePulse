import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { profileService } from '../../services/api';

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date_naissance: null as Date | null,
    taille_cm: '',
    adresse: '',
    complement_adresse: '',
    code_postal: '',
    ville: '',
    user:  {
      firstName: '',
      lastName: '',
      civility: '',
    }
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await profileService.getProfile();
      const data = {
        date_naissance: profile.date_naissance ? new Date(profile.date_naissance) : null,
        taille_cm: profile.taille_cm?.toString() || '',
        adresse: profile.adresse || '',
        complement_adresse: profile.complement_adresse || '',
        code_postal: profile.code_postal || '',
        ville: profile.ville || '',
        user: {
          firstName: profile.user.firstName || '',
          lastName: profile.user.lastName || '',
          civility: profile.user.civility || '',
        },
      };
      setFormData(data);
      setInitialData(data);
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

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleUserChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [field]: event.target.value
      }
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : null;
    setFormData(prev => ({
      ...prev,
      date_naissance: date
    }));
  };

  const calculateAge = (birthDate: Date | null) => {
    if (!birthDate) return '';
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        date_naissance: formData.date_naissance || undefined,
        taille_cm: formData.taille_cm ? parseFloat(formData.taille_cm) : undefined,
      };
      // Si le backend attend civility à la racine, décommente la ligne suivante :
      // dataToSend.civility = formData.user.civility;
      // Sinon, il faut que ce soit dans user : dataToSend.user.civility

      await profileService.updateProfile(dataToSend);
      
      setAlert({
        open: true,
        message: 'Profil mis à jour avec succès',
        severity: 'success'
      });

      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erreur lors de la mise à jour du profil',
        severity: 'error'
      });
    }
  };

  const isFormChanged = () => {
    if (!initialData) return false;
    // Comparaison simple des champs principaux et user.civility
    return (
      formData.date_naissance?.toString() !== initialData.date_naissance?.toString() ||
      formData.taille_cm !== initialData.taille_cm ||
      formData.adresse !== initialData.adresse ||
      formData.complement_adresse !== initialData.complement_adresse ||
      formData.code_postal !== initialData.code_postal ||
      formData.ville !== initialData.ville ||
      formData.user.civility !== initialData.user.civility
    );
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
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                DATE DE NAISSANCE
              </label>
              <input
                type="date"
                value={formData.date_naissance ? format(formData.date_naissance, 'yyyy-MM-dd') : ''}
                onChange={handleDateChange}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                AGE
              </label>
              <div className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary">
                {calculateAge(formData.date_naissance)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                CIVILITÉ
              </label>
              <select
                value={formData.user.civility}
                onChange={handleUserChange('civility')}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary appearance-none"
              >
                <option value="Monsieur">Monsieur</option>
                <option value="Madame">Madame</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                TAILLE (CM)
              </label>
              <input
                type="number"
                value={formData.taille_cm}
                onChange={handleChange('taille_cm')}
                min="0"
                max="300"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              ADRESSE
            </label>
            <input
              type="text"
              value={formData.adresse}
              onChange={handleChange('adresse')}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
              placeholder="5 BD la gloire"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              COMPLÉMENT D'ADRESSE
            </label>
            <input
              type="text"
              value={formData.complement_adresse}
              onChange={handleChange('complement_adresse')}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
              placeholder="Bâtiment B, étage 2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                CODE POSTAL
              </label>
              <input
                type="text"
                value={formData.code_postal}
                onChange={handleChange('code_postal')}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
                placeholder="44000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                VILLE
              </label>
              <input
                type="text"
                value={formData.ville}
                onChange={handleChange('ville')}
                className="w-full px-3 py-2 bg-gray-50 rounded-lg text-primary"
                placeholder="Nantes"
              />
            </div>
          </div>

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

export default PersonalInfo; 