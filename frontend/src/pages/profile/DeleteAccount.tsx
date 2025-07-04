import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/api';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await authService.deleteAccount(token!);
      navigate('/account-deleted');
      setTimeout(async () => {
        await logout();
      }, 100);
    } catch (error) {
      console.error('Erreur suppression compte :', error);
      setLoading(false);
    }
  };

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center p-6 text-center bg-white rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-extrabold text-[#1a237e] mb-4">
          ERDRE PULSE.
        </h1>

        <p className="text-base font-bold mb-2 text-[#1a237e]">
          Êtes-vous sûr de vouloir supprimer votre compte ?
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Cette action est irréversible.<br />
          Toutes vos données seront définitivement supprimées.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-[#1a237e] font-bold px-6 py-2 rounded-full"
          >
            Non
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-[#1a237e] text-white font-bold px-6 py-2 rounded-full"
          >
            Oui
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
