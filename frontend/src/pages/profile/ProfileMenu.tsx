import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase, Trash2, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { profileService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const ProfileMenu = () => {
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (error) {
        setProfile(null);
      }
    };
    loadProfile();
  }, []);

  const menuItems = [
    {
      path: '/profile/personal',
      label: 'Informations personnelles',
      icon: User,
    },
    {
      path: '/profile/professional',
      label: 'Informations professionnelles',
      icon: Briefcase,
    },
    ...(user && !user.coach ? [{
      path: '/bilans/history',
      label: 'Mes bilans',
      icon: FileText,
    }] : []),
    {
      path: '/delete-account',
      label: 'Supprimer mon compte',
      icon: Trash2,
      color: 'bg-red-50 hover:bg-red-100',
      textColor: 'text-red-700'
    },
  ];

  return (
    
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="mt-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-3xl font-medium">
            {profile ? (profile.user?.firstName?.charAt(0) || '?') : '?'}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-semibold text-primary text-center">
          {profile ? `${profile.user?.firstName || ''} ${profile.user?.lastName || ''}` : ''}
        </h2>
      </div>  
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Menu du profil
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Gérez vos informations et paramètres
        </p>
      </div>
      <div className="border-t border-gray-200">
      <nav className="space-y-2 mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isDelete = item.path === '/delete-account';

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isDelete
                  ? 'text-red-600 hover:bg-red-50'
                  : isActive
                  ? 'bg-primary-main text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      </div>
    </div>
  );
};

export default ProfileMenu; 
