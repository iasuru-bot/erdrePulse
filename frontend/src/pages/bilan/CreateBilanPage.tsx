import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import bilanService from "../../services/bilanService";
import { useAuth } from "../../contexts/AuthContext";
import { User, userService } from "../../services/userService";
import { profileService } from "../../services/api";
import { BilanData } from "../../types/bilan";
import BilanStepManager from "../../components/bilan/BilanStepManager";
import { bilanSteps, getStepValidation } from "../../utils/bilanValidation";
import toast, { Toaster } from 'react-hot-toast';
import { optionService } from "../../services/optionService";


const CreateBilanPage: React.FC = () => {  
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [client, setClient] = useState<User | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  const calculerAge = (dateNaissance: string): number | undefined => {
    if (!dateNaissance) return undefined;
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const [bilanData, setBilanData] = useState<BilanData>({
    clientNom: "",
    informations: {
      civility: "",
      date_naissance: "",
      adresse: "",
      code_postal: "",
      ville: "",
      taille: 0,
      poids: 0,
      imc: 0,
      interpretation: "",
      activite: "",
      age: 0,
      complement_adresse: "",
    },
    informationsProfessionnelles: {
      secteur_activite: "",
      autre_secteur: "",
      profession: "",
      autre_profession: "",
    },
    objectifs: [
    ],
    habitudes: {
      fumeur: null,
      consommation_alcool: null,
    },
    sommeil: {
      nb_heures_sommeil: "",
      nb_repas: "",
      collation: null,
      petit_dejeuner: "",
      collation_details: "",
    },
    antecedents: {
      antecedents_medicaux: null,
      operations_accidents: null,
      traitements_actuels: null
    },
    symptomes: {
      douleurs_thoraciques: null,
      douleurs_chroniques: null,
    },
    testsphysiques: {
      test_effort_6_mois: null,
      test_effort_commentaire: "",
    },
    testequilibre: {
      test_equilibre_1: undefined,
      test_equilibre_2: undefined,
      test_equilibre_resultat: "",
      test_equilibre_commentaire: "",
      test_equilibre_conseil: "",
    },
    testsouplesse: {
      test_souplesse_resultat: undefined,
      test_souplesse_commentaire: "",
      test_souplesse_conseil: "",
    },
    testforceinf: {
      test_force_inf_resultat: "",
      test_force_inf_commentaire: "",
      test_force_inf_conseil: "",
    },
    testforcesup: {
      test_force_sup_resultat: "",
      test_force_sup_commentaire: "",
      test_force_sup_conseil: "",
    },
    testendurance: {
      test_endurance_resultat: undefined,
      test_endurance_lbn: undefined,
      test_endurance_commentaire: "",
      test_endurance_conseil: "",
    },
    testvma: {
      test_vma_resultat: "",
      test_vma_vo2max: undefined,
      test_vma_commentaire: "",
      test_vma_conseil: "",
    },
    metabasal: {
       nap: undefined,
       commentaire_metabolisme: "",
    },
    recommandations: [],
    fatigue1: {},
    fatigue2: {},
    activites: [],
    commentaire_activites: "",
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!user) {
      toast.error("Vous devez être connecté pour accéder à cette page");
      navigate('/login');
      return;
    }

    // Vérifier si l'ID du client est présent dans l'URL
    if (!clientId) {
      toast.error("ID du client manquant");
      navigate('/clients');
      return;
    }

    const parsedClientId = parseInt(clientId);
    if (isNaN(parsedClientId)) {
      toast.error("ID du client invalide");
      navigate('/clients');
      return;
    }

    const fetchClientData = async () => {
      try {
        // Récupérer les informations de base du client
        const clientData = await userService.getUserById(parsedClientId);
        setClient(clientData);

        // Récupérer le profil du client
        const profileData = await profileService.getProfileById(parsedClientId);

        // Mettre à jour le bilan avec les informations du profil
        setBilanData(prev => ({
          ...prev,
          clientNom: `${clientData.firstName} ${clientData.lastName}`,
          informations: {
            ...prev.informations,
            civility: profileData.user.civility || "",
            date_naissance: profileData.date_naissance || "",
            adresse: profileData.adresse || "",
            code_postal: profileData.code_postal || "",
            ville: profileData.ville || "",
            complement_adresse: profileData.complement_adresse || "",
            taille: profileData.taille_cm || 0,
            poids: profileData.poids_kg || 0,
            age: calculerAge(profileData.date_naissance || "") || 0,
          },
          informationsProfessionnelles: {
            ...prev.informationsProfessionnelles,
            secteur_activite: profileData.secteur_activite || "",
            profession: profileData.activite_professionnelle || "",
          }
        }));

      } catch (error) {
        console.error('Erreur lors de la récupération des données du client:', error);
        toast.error("Erreur lors de la récupération des données du client");
        navigate('/clients');
      }
    };

    fetchClientData();
  }, [clientId, user, navigate]);

  const handleDataChange = (newData: Partial<BilanData>) => {
    // Si la date de naissance est modifiée, recalculer l'âge
    if (newData.informations?.date_naissance) {
      const age = calculerAge(newData.informations.date_naissance);
      if (age !== undefined) {
        newData.informations = {
          ...newData.informations,
          age
        };
      }
    }
    setBilanData(prev => ({ ...prev, ...newData }));
    setValidationError("");
  };

  const handleNextStep = () => {
    const { isValid, errorMessage } = getStepValidation(currentStep, bilanData);
    if (isValid) {
      setCurrentStep(prev => Math.min(bilanSteps.length, prev + 1));
      setValidationError("");
    } else {
      setValidationError(errorMessage);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    setValidationError("");
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour créer un bilan");
      navigate('/login');
      return;
    }

    if (!client) {
      toast.error("Client non trouvé");
      navigate('/clients');
      return;
    }

    // Vérifier la validation de toutes les étapes
    for (let step = 1; step <= bilanSteps.length; step++) {
      const { isValid, errorMessage } = getStepValidation(step, bilanData);
      if (!isValid) {
        setValidationError(errorMessage);
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    try {
      let dataToSend = { ...bilanData };
      // Gestion création différée secteur/profession personnalisée
      // Si secteur = 'autre' et un texte a été saisi dans autre_secteur
      if (dataToSend.informationsProfessionnelles.secteur_activite === 'autre' && dataToSend.informationsProfessionnelles.autre_secteur) {
        const newSecteur = await optionService.addNewSecteur(dataToSend.informationsProfessionnelles.autre_secteur);
        dataToSend.informationsProfessionnelles.secteur_activite = newSecteur.value;
        dataToSend.informationsProfessionnelles.autre_secteur = '';
      }
      // Si profession = '' (cas "autre"), et un texte a été saisi dans autre_profession
      if ((dataToSend.informationsProfessionnelles.profession === '' || dataToSend.informationsProfessionnelles.profession === 'autre') && dataToSend.informationsProfessionnelles.autre_profession) {
        const newProfession = await optionService.addNewProfession({
          profession: dataToSend.informationsProfessionnelles.autre_profession,
          secteur: dataToSend.informationsProfessionnelles.secteur_activite
        });
        dataToSend.informationsProfessionnelles.profession = newProfession.value;
        dataToSend.informationsProfessionnelles.autre_profession = '';
      }
      await bilanService.createBilan(dataToSend, client.id);
      toast.success("Bilan enregistré avec succès !");
      navigate('/bilans?userId='+clientId); //mettre la redirection vers les bilans
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      if (error instanceof Error) {
        const errorMessages = error.message.split('\n');
        setValidationError(errorMessages.join('\n'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error("Une erreur inattendue s'est produite lors de l'enregistrement du bilan.");
      }
    }
  };

  const progress = (currentStep / bilanSteps.length) * 100;

  return (
    <div className="max-w-md mx-auto bg-white min-h-[90vh] rounded-2xl shadow-lg p-4 flex flex-col relative">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            borderRadius: '0.5rem',
            padding: '1rem',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#023047] mb-2 uppercase tracking-wider text-center">
          BILAN de {client?.firstName} {client?.lastName}
        </h1>
        
        {/* Barre de progression */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Étape {currentStep}</span>
          <span>sur {bilanSteps.length}</span>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-[#023047] mb-4 text-center">
          {bilanSteps[currentStep - 1].title}
        </h2>
        <BilanStepManager
          currentStep={currentStep}
          bilanData={bilanData}
          onDataChange={handleDataChange}
        />
        {validationError && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-center">
            {validationError}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className={`w-16 h-16 flex items-center justify-center rounded-full bg-primary shadow-md transition disabled:opacity-40`}
          style={{ border: 'none' }}
        >
          <ChevronLeftIcon className="w-10 h-10 text-white" />
        </button>
        {currentStep !== bilanSteps.length && (
          <button
            type="button"
            onClick={handleNextStep}
            className={`w-16 h-16 flex items-center justify-center rounded-full bg-primary shadow-md transition disabled:opacity-40`}
            style={{ border: 'none' }}
          >
            <ChevronRightIcon className="w-10 h-10 text-white" />
          </button>
        )}
      </div>
      {currentStep === bilanSteps.length && (
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary/80"
        >
          Enregistrer le bilan
        </button>
      )}
    </div>
  );
};

export default CreateBilanPage;
