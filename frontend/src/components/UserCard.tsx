import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, UserPlus, UserMinus } from 'lucide-react';
import { User, userService } from '../services/userService';

interface UserCardProps {
  utilisateur: User;
  onUserUpdate?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ utilisateur, onUserUpdate }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const handleVoirBilans = () => {
    navigate(`/bilans?userId=${utilisateur.id}`);
  };

  const handleCreerBilan = () => {
    navigate(`/bilans/create/${utilisateur.id}`);
  };

  const handleUserAction = async () => {
    try {
      await userService.updateUserRole(utilisateur.id, 'coach', true);
      if (onUserUpdate) {
        onUserUpdate();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
    }
  };

  const handleRemoveCoach = async () => {
    try {
      await userService.removeUserRole(utilisateur.id, 'coach');
      if (onUserUpdate) {
        onUserUpdate();
      }
    } catch (error) {
      console.error('Erreur lors du retrait du rôle coach:', error);
    }
  };

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 ${utilisateur.coach ? 'border-red-600' : 'border-primary'} flex items-center justify-center`}>
          <svg className={`w-8 h-8 ${utilisateur.coach ? 'text-red-600' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
          </svg>
        </div>
        {/* Infos utilisateur */}
        <div className="flex flex-col">
          <span className={`font-bold text-lg tracking-widest uppercase ${utilisateur.coach ? 'text-red-600' : 'text-gray-800'}`}>
            {utilisateur.firstName} {utilisateur.lastName} 
            {utilisateur.coach && (
            <span className="text-red-600 font-bold uppercase text-xs mt-0.5 ml-1">Coach</span>
            )}
          </span>
          
          <div className="text-xs text-gray-500">
            {utilisateur.email}
          </div>
          <div className='flex flex-row gap-x-2 mt-1'>
            <button
              onClick={handleVoirBilans}
              className={`flex items-center text-white font-bold uppercase underline text-sm w-fit px-2 py-1 rounded ${utilisateur.coach ? 'bg-red-600 hover:bg-red-700' : 'bg-primary'}`}
            >
              Voir bilans
            </button>
            {currentUser?.coach && !utilisateur.coach && !utilisateur.admin && (
              <button
                onClick={handleCreerBilan}
                className={`flex items-center text-white font-bold uppercase underline text-sm w-fit px-2 py-1 rounded ${utilisateur.coach ? 'bg-red-600 hover:bg-red-700' : 'bg-primary'}`}
              >
                <FileText className="h-4 w-4 mr-1" />
                Créer bilan
              </button>
            )}
            {currentUser?.admin && !utilisateur.coach &&(
              <button
                onClick={handleUserAction}
                className={`flex items-center text-white font-bold uppercase underline text-sm w-fit px-2 py-1 rounded ${utilisateur.coach ? 'bg-red-600 hover:bg-red-700' : 'bg-primary'}`}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Devenir coach
              </button>
            )}
            {currentUser?.admin && utilisateur.coach && !utilisateur.admin && (
              <button
                onClick={handleRemoveCoach}
                className={`flex items-center text-white font-bold uppercase underline text-sm w-fit px-2 py-1 rounded bg-red-600 hover:bg-red-700`}
              >
                <UserMinus className="h-4 w-4 mr-1" />
                Retirer coach
              </button>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserCard;
