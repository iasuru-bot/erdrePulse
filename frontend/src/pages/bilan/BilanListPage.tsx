import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bilanService } from '../../services/bilanService';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, FileText, Eye, Plus } from 'lucide-react';
import Button from '../../components/common/Button';

interface Bilan {
  id: number;
  date: string;
  taille: number;
  poids: number;
  imc: number;
  status: 'draft' | 'validated';
  client: {
    id: number;
    firstName: string;
    lastName: string;
  };
  coach: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

const BilanListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bilans, setBilans] = useState<Bilan[]>([]);
  const [client, setClient] = useState<{ id: number; firstName: string; lastName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isCoachView = user?.coach && location.search.includes('userId=');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (isCoachView) {
          const searchParams = new URLSearchParams(location.search);
          const userId = searchParams.get('userId');

          if (!userId) {
            setError("ID de l'utilisateur manquant");
            return;
          }

          const parsedUserId = parseInt(userId);
          if (isNaN(parsedUserId)) {
            setError("ID de l'utilisateur invalide");
            return;
          }

          // Récupérer les informations du client pour la vue coach
          const clientData = await userService.getUserById(parsedUserId);
          if (!clientData) {
            setError("Utilisateur non trouvé");
            return;
          }
          setClient(clientData);

          // Récupérer les bilans du client spécifique
          const bilansData = await bilanService.getUserBilansById(parsedUserId);
          setBilans(bilansData || []);
        } else {
          // Vue client - récupérer les bilans de l'utilisateur connecté
          if (!user?.id) {
            setError("Session utilisateur invalide");
            return;
          }
          const bilansData = await bilanService.getUserBilans();
          setBilans(bilansData || []);
        }
      } catch (err) {
        // Ne pas afficher d'erreur si c'est simplement qu'il n'y a pas de bilans
        if (err instanceof Error && err.message.includes('404')) {
          setBilans([]);
        } else {
          setError("Erreur lors du chargement des bilans");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, user?.id, isCoachView]);

  const handleViewBilan = (bilanId: number) => {
    navigate(`/bilans/${bilanId}`);
  };

  const getPageTitle = () => {
    if (isCoachView) {
      return `Bilans de ${client?.firstName} ${client?.lastName}`;
    }
    return "Mes bilans";
  };

  const getPageDescription = () => {
    if (isCoachView) {
      return "Historique des bilans et suivi";
    }
    return "Historique de mes bilans et suivi";
  };

  const getEmptyStateMessage = () => {
    if (isCoachView) {
      return "Aucun bilan n'a encore été créé pour cet utilisateur.";
    }
    return "Vous n'avez pas encore de bilan.";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark bg-white"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600 mt-1">
            {getPageDescription()}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark bg-white"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Retour
        </button>
      </div>

      {bilans.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun bilan</h3>
          <p className="mt-1 text-sm text-gray-500">
            {getEmptyStateMessage()}
          </p>
          {isCoachView && (
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(`/bilans/create/${client?.id}`)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Créer un nouveau bilan
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {bilans.map((bilan) => (
              <li key={bilan.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Bilan du {format(new Date(bilan.date), 'dd MMMM yyyy', { locale: fr })}
                        </div>
                        <div className="text-sm text-gray-500">
                          IMC: {bilan.imc.toFixed(1)} - Poids: {bilan.poids}kg - Taille: {bilan.taille}cm
                        </div>  
                        <div className="text-sm text-gray-500">
                          Coach: {bilan.coach.firstName} {bilan.coach.lastName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleViewBilan(bilan.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary bg-white hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isCoachView && client && bilans.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(`/bilans/create/${client.id}`)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Créer un nouveau bilan
          </Button>
        </div>
      )}
    </div>
  );
};

export default BilanListPage; 