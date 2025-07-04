
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutSuccess() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('logoutName') || 'utilisateur';

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('logoutName');
      navigate('/login');
    }, 2500);
  }, [navigate, firstName]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-white">
      <h1 className="text-4xl font-extrabold text-[#1a237e] mb-6">ERDRE PULSE.</h1>
      <h2 className="text-2xl font-bold text-[#1a237e] mb-2">
        À bientôt {firstName} !
      </h2>
      <p className="text-[#1a237e] font-medium">
        Gardez le rythme et restez motivé !
      </p>
      <p className="text-sm text-gray-600 mt-4 max-w-xs">
        Vous pouvez vous reconnecter à tout moment pour reprendre là où vous vous êtes arrêté.
      </p>
    </div>
  );
}

