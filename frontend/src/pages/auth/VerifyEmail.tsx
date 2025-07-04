import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/api';
import Button from '../../components/common/Button';

const VerifyEmail = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Vérification de votre adresse email en cours...');
  const navigate = useNavigate();
  const location = useLocation();
  const hasVerified = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (!token) {
          setStatus('error');
          setMessage('Token de vérification manquant. Veuillez utiliser le lien complet reçu par email.');
          return;
        }

        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('Votre adresse email a été vérifiée avec succès!');
      } catch (error: any) {
        console.error('Erreur lors de la vérification de l\'email:', error);
        setStatus('error');
        setMessage(error.response?.data?.message || 'Une erreur est survenue lors de la vérification de votre email.');
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <div className=" flex flex-col md:flex-row bg-white">
      <div className="w-full p-4 md:p-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <div className="space-y-6 animate-slideUp">
            <h2 className="text-3xl font-bold text-center text-[#002868] mb-2">
              {status === 'loading' ? 'Vérification en cours' : 
               status === 'success' ? 'Compte vérifié !' : 
               'Échec de la vérification'}
            </h2>

            {status === 'loading' && (
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-primary-main border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-text-secondary">
                  {message}
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-success-light text-success-main rounded-full flex items-center justify-center mx-auto text-4xl">
                  ✓
                </div>
                <div className="bg-success-light text-success-main px-4 py-3 rounded-md">
                  {message}
                </div>
                <p className="text-text-secondary">
                  Vous pouvez maintenant vous connecter à votre compte et profiter de tous nos services.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => navigate('/login')}
                >
                  Se connecter
                </Button>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-error-light text-error-main rounded-full flex items-center justify-center mx-auto text-4xl">
                  ✗
                </div>
                <div className="bg-error-light text-error-main px-4 py-3 rounded-md">
                  {message}
                </div>
                <p className="text-text-secondary">
                  Le lien de vérification semble être invalide ou a expiré. Veuillez vérifier que vous utilisez le lien complet ou essayez de vous réinscrire.
                </p>
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="outlined"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/register')}
                  >
                    Retour à l'inscription
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/login')}
                  >
                    Se connecter
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 