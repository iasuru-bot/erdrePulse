import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bilanService } from '../../services/bilanService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  ChevronLeft, 
  FileText, 
  User, 
  Scale, 
  Ruler, 
  Target, 
  Activity, 
  Heart, 
  Coffee, 
  Bed, 
  Dumbbell,
  Brain,
  Clock,
  Zap,
  Eye
} from 'lucide-react';
import ImageWithModal from '../../components/common/ImageWithModal';
import toast from 'react-hot-toast';

interface BilanObjectif {
  id: number;
  titre: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface BilanActivite {
  id: number;
  type: string;
  estOptionnelle: boolean;
  BilanActivites: {
    frequence: string;
    estOptionnelle: boolean;
  };
}

interface BilanSanteVie {
  antecedents_medicaux: boolean;
  antecedents_medicaux_precisions?: string;
  operations_accidents: boolean;
  operations_accidents_precisions?: string;
  traitements_actuels: boolean;
  traitements_actuels_precisions?: string;
  douleurs_thoraciques: boolean;
  douleurs_thoraciques_precisions?: string;
  douleurs_chroniques: boolean;
  douleurs_chroniques_precisions?: string;
  fumeur: boolean;
  consommation_alcool: boolean;
  heures_alcool_semaine?: number;
  petit_dejeuner?: string;
  collation: boolean;
  collation_details?: string;
  nbHeuresSommeilRef?: {
    label: string;
  };
  nbRepasRef?: {
    label: string;
  };
}

interface BilanTestsPhysiques {
  test_effort_6_mois: boolean;
  test_effort_commentaire?: string;
  test_equilibre_1?: number;
  test_equilibre_2?: number;
  test_equilibre_resultat?: string;
  test_equilibre_commentaire?: string;
  test_equilibre_conseil?: string;
  test_souplesse_resultat?: number;
  test_souplesse_commentaire?: string;
  test_souplesse_conseil?: string;
  test_force_inf_resultat?: string;
  test_force_inf_commentaire?: string;
  test_force_inf_conseil?: string;
  test_force_sup_resultat?: string;
  test_force_sup_commentaire?: string;
  test_force_sup_conseil?: string;
  test_endurance_resultat?: number;
  test_endurance_lbn?: number;
  test_endurance_commentaire?: string;
  test_endurance_conseil?: string;
  test_vma_resultat?: string;
  test_vma_vo2max?: number;
  test_vma_commentaire?: string;
  test_vma_conseil?: string;
  fatigue_equilibre?: string;
  fatigue_souplesse?: string;
  fatigue_force_inf?: string;
  fatigue_force_sup?: string;
  fatigue_endurance?: string;
  fatigue_vma?: string;
  fatigue_commentaire?: string;
}

interface BilanDetail {
  id: number;
  date: string;
  taille: number;
  poids: number;
  imc: number;
  status: 'draft' | 'validated';
  niveau_activite_physique: string;
  metabolisme_basal: number;
  metabolisme_total: number;
  nap: number;
  commentaire_metabolisme?: string;
  commentaire_global?: string;
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
  objectifs?: BilanObjectif[];
  activites?: BilanActivite[];
  santeVie?: BilanSanteVie;
  testsPhysiques?: BilanTestsPhysiques;
}

const BilanDetailPage: React.FC = () => {
  const { bilanId } = useParams<{ bilanId: string }>();
  const navigate = useNavigate();
  const [bilan, setBilan] = useState<BilanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBilan = async () => {
      try {
        setLoading(true);
        if (!bilanId) {
          throw new Error("ID du bilan manquant");
        }
        const parsedId = parseInt(bilanId);
        if (isNaN(parsedId)) {
          throw new Error("ID du bilan invalide");
        }
        const bilanData = await bilanService.getBilanById(parsedId);
        setBilan(bilanData);
      } catch (err: any) {
        let message = "Erreur lors du chargement du bilan";
        if (err?.response?.data?.message) {
          message = err.response.data.message;
          toast.error(message);
        } else if (err?.message) {
          message = err.message;
          toast.error(message);
        } else {
          toast.error(message);
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBilan();
  }, [bilanId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !bilan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="text-red-600 text-2xl font-bold mb-4">Erreur</div>
        <div className="text-gray-700 text-lg mb-4 text-center max-w-md">{error || "Bilan non trouvé ou inaccessible. Veuillez réessayer plus tard ou contacter un administrateur."}</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark bg-white border border-primary rounded px-4 py-2"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Retour
        </button>
      </div>
    );
  }

  const renderSection = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          {icon}
          <h3 className="text-lg leading-6 font-medium text-gray-900 ml-2">
            {title}
          </h3>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {children}
        </dl>
      </div>
    </div>
  );

  const renderField = (label: string, value: React.ReactNode, icon?: React.ReactNode, bgColor: 'white' | 'gray' = 'white') => (
    <div className={`${bgColor === 'gray' ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
      <dt className="text-sm font-medium text-gray-500 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );

  const renderTestImageButton = (testName: string, imagePath: string) => (
    <ImageWithModal
      src={imagePath}
      alt={`Test ${testName}`}
      useButton={true}
      buttonText="Voir la référence"
      buttonIcon={<Eye className="h-4 w-4 mr-1" />}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Détails du bilan
          </h1>
          <p className="text-gray-600 mt-1">
            {format(new Date(bilan.date), 'dd MMMM yyyy', { locale: fr })}
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

      {/* Informations générales */}
      {renderSection(
        "Informations générales",
        <FileText className="h-6 w-6 text-primary" />,
        <>
          {renderField("Client", `${bilan.client.firstName} ${bilan.client.lastName}`, <User className="h-5 w-5" />, 'gray')}
          {renderField("Coach", `${bilan.coach.firstName} ${bilan.coach.lastName}`, <User className="h-5 w-5" />)}
        </>
      )}

      {/* Mesures et métabolisme */}
      {renderSection(
        "Mesures et métabolisme",
        <Activity className="h-6 w-6 text-primary" />,
        <>
          {renderField("Poids", `${bilan.poids} kg`, <Scale className="h-5 w-5" />, 'gray')}
          {renderField("Taille", `${bilan.taille} cm`, <Ruler className="h-5 w-5" />)}
          {renderField("IMC", bilan.imc.toFixed(1), <Activity className="h-5 w-5" />, 'gray')}
          {renderField("Niveau d'activité physique", bilan.niveau_activite_physique, <Zap className="h-5 w-5" />)}
          {renderField("Métabolisme basal", `${bilan.metabolisme_basal.toFixed(0)} kcal`, <Heart className="h-5 w-5" />, 'gray')}
          {renderField("NAP", bilan.nap.toFixed(2), <Activity className="h-5 w-5" />)}
          {bilan.commentaire_metabolisme && renderField("Commentaire métabolisme", bilan.commentaire_metabolisme, <FileText className="h-5 w-5" />, 'gray')}
        </>
      )}

      {/* Objectifs */}
      {bilan.objectifs && bilan.objectifs.length > 0 && renderSection(
        "Objectifs",
        <Target className="h-6 w-6 text-primary" />,
        <div className="px-4 py-5 sm:px-6">
          <ul className="space-y-2">
            {bilan.objectifs.map((objectif) => (
              <li key={objectif.id} className="border-l-2 border-primary pl-3">
                <div className="font-medium font text-gray-600">{objectif.titre}</div>
                {objectif.description && (
                  <div className="text-gray-600 mt-1">{objectif.description}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Activités */}
      {bilan.activites && bilan.activites.length > 0 && renderSection(
        "Activités",
        <Dumbbell className="h-6 w-6 text-primary" />,
        <div className="px-4 py-5 sm:px-6">
          <ul className="space-y-2">
            {bilan.activites.map((activite) => {
              return (
                <li key={activite.id} className="border-l-2 border-primary pl-3">
                  <div className="font-medium text-gray-600">{activite.type}</div>
                  <div className="text-gray-600 mt-1">
                    Fréquence: {activite.BilanActivites.frequence} séance{activite.BilanActivites.frequence !== '1' ? 's' : ''} par semaine
                    {activite.estOptionnelle && " (Optionnel)"}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Santé et mode de vie */}
      {bilan.santeVie && renderSection(
        "Santé et mode de vie",
        <Heart className="h-6 w-6 text-primary" />,
        <>
          {bilan.santeVie.antecedents_medicaux && renderField(
            "Antécédents médicaux",
            bilan.santeVie.antecedents_medicaux_precisions || "Présence d'antécédents médicaux",
            <Heart className="h-5 w-5" />,
            'gray'
          )}
          {bilan.santeVie.operations_accidents && renderField(
            "Opérations/Accidents",
            bilan.santeVie.operations_accidents_precisions || "Présence d'opérations ou d'accidents",
            <Heart className="h-5 w-5" />
          )}
          {bilan.santeVie.traitements_actuels && renderField(
            "Traitements actuels",
            bilan.santeVie.traitements_actuels_precisions || "Présence de traitements en cours",
            <Heart className="h-5 w-5" />,
            'gray'
          )}
          {bilan.santeVie.douleurs_thoraciques && renderField(
            "Douleurs thoraciques",
            bilan.santeVie.douleurs_thoraciques_precisions || "Présence de douleurs thoraciques",
            <Heart className="h-5 w-5" />
          )}
          {bilan.santeVie.douleurs_chroniques && renderField(
            "Douleurs chroniques",
            bilan.santeVie.douleurs_chroniques_precisions || "Présence de douleurs chroniques",
            <Heart className="h-5 w-5" />,
            'gray'
          )}
          {renderField("Fumeur", bilan.santeVie.fumeur ? "Oui" : "Non", <Coffee className="h-5 w-5" />)}
          {renderField(
            "Consommation d'alcool",
            bilan.santeVie.consommation_alcool 
              ? `${bilan.santeVie.heures_alcool_semaine || 0} heures par semaine`
              : "Non",
            <Coffee className="h-5 w-5" />,
            'gray'
          )}
          {renderField("Sommeil", (bilan.santeVie.nbHeuresSommeilRef?.label || "Non spécifié"), <Bed className="h-5 w-5" />)}
          {renderField("Nombre de repas", (bilan.santeVie.nbRepasRef?.label || "Non spécifié"), <Coffee className="h-5 w-5" />, 'gray')}
          {bilan.santeVie.petit_dejeuner && renderField("Petit déjeuner", bilan.santeVie.petit_dejeuner, <Coffee className="h-5 w-5" />)}
          {bilan.santeVie.collation && renderField(
            "Collation",
            bilan.santeVie.collation_details || "Présence de collations",
            <Coffee className="h-5 w-5" />,
            'gray'
          )}
        </>
      )}

      {/* Tests physiques */}
      {bilan.testsPhysiques && renderSection(
        "Tests physiques",
        <Brain className="h-6 w-6 text-primary" />,
        <>
          {renderField(
            "Test d'effort",
            <>
              <div className="flex items-center justify-between">
                <div>
                  {bilan.testsPhysiques.test_effort_6_mois 
                    ? `Réalisé (${bilan.testsPhysiques.test_effort_commentaire || "Sans commentaire"})`
                    : "Non réalisé"}
                </div>
  
              </div>
            </>,
            <Activity className="h-5 w-5" />,
            'gray'
          )}
          {bilan.testsPhysiques.test_equilibre_resultat && renderField(
            "Test d'équilibre",
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div>Résultat: {bilan.testsPhysiques.test_equilibre_resultat}</div>
                  {bilan.testsPhysiques.test_equilibre_commentaire && (
                    <div className="text-gray-600 mt-1">Commentaire: {bilan.testsPhysiques.test_equilibre_commentaire}</div>
                  )}
                  {bilan.testsPhysiques.test_equilibre_conseil && (
                    <div className="text-gray-600 mt-1">Conseil: {bilan.testsPhysiques.test_equilibre_conseil}</div>
                  )}
                </div>
                {renderTestImageButton("d'équilibre", "/images/TESTE_EQUILIBRE.png")}
              </div>
            </>,
            <Activity className="h-5 w-5" />
          )}
          {bilan.testsPhysiques.test_souplesse_resultat && renderField(
            "Test de souplesse",
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div>Résultat: {bilan.testsPhysiques.test_souplesse_resultat}</div>
                  {bilan.testsPhysiques.test_souplesse_commentaire && (
                    <div className="text-gray-600 mt-1">Commentaire: {bilan.testsPhysiques.test_souplesse_commentaire}</div>
                  )}
                  {bilan.testsPhysiques.test_souplesse_conseil && (
                    <div className="text-gray-600 mt-1">Conseil: {bilan.testsPhysiques.test_souplesse_conseil}</div>
                  )}
                </div>
                {renderTestImageButton("de souplesse", "/images/TEST_SOUPLESSE.png")}
              </div>
            </>,
            <Activity className="h-5 w-5" />,
            'gray'
          )}
          {bilan.testsPhysiques.test_force_inf_resultat && renderField(
            "Test de force inférieure",
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div>Résultat: {bilan.testsPhysiques.test_force_inf_resultat}</div>
                  {bilan.testsPhysiques.test_force_inf_commentaire && (
                    <div className="text-gray-600 mt-1">Commentaire: {bilan.testsPhysiques.test_force_inf_commentaire}</div>
                  )}
                  {bilan.testsPhysiques.test_force_inf_conseil && (
                    <div className="text-gray-600 mt-1">Conseil: {bilan.testsPhysiques.test_force_inf_conseil}</div>
                  )}
                </div>
                {renderTestImageButton("de force inférieure", "/images/Tableau_force_Memb_Inferieur.jpg")}
              </div>
            </>,
            <Activity className="h-5 w-5" />
          )}
          {bilan.testsPhysiques.test_force_sup_resultat && renderField(
            "Test de force supérieure",
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div>Résultat: {bilan.testsPhysiques.test_force_sup_resultat}</div>
                  {bilan.testsPhysiques.test_force_sup_commentaire && (
                    <div className="text-gray-600 mt-1">Commentaire: {bilan.testsPhysiques.test_force_sup_commentaire}</div>
                  )}
                  {bilan.testsPhysiques.test_force_sup_conseil && (
                    <div className="text-gray-600 mt-1">Conseil: {bilan.testsPhysiques.test_force_sup_conseil}</div>
                  )}
                </div>
                {renderTestImageButton("de force supérieure", "/images/Tableau_force_Memb_Superieur.jpg")}
              </div>
            </>,
            <Activity className="h-5 w-5" />,
            'gray'
          )}
          {bilan.testsPhysiques.test_endurance_resultat && renderField(
            "Test d'endurance",
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div>Résultat: {bilan.testsPhysiques.test_endurance_resultat}</div>
                  {bilan.testsPhysiques.test_endurance_lbn && (
                    <div>LBN: {bilan.testsPhysiques.test_endurance_lbn}</div>
                  )}
                  {bilan.testsPhysiques.test_endurance_commentaire && (
                    <div className="text-gray-600 mt-1">Commentaire: {bilan.testsPhysiques.test_endurance_commentaire}</div>
                  )}
                  {bilan.testsPhysiques.test_endurance_conseil && (
                    <div className="text-gray-600 mt-1">Conseil: {bilan.testsPhysiques.test_endurance_conseil}</div>
                  )}
                </div>
                {renderTestImageButton("d'endurance", "/images/TEST_D_ENDURENCE.png")}
              </div>
            </>,
            <Activity className="h-5 w-5" />
          )}
          {bilan.testsPhysiques.test_vma_resultat && renderField(
            "Test VMA",
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div>Résultat: {bilan.testsPhysiques.test_vma_resultat}</div>
                  {bilan.testsPhysiques.test_vma_vo2max && (
                    <div>VO2max: {bilan.testsPhysiques.test_vma_vo2max}</div>
                  )}
                  {bilan.testsPhysiques.test_vma_commentaire && (
                    <div className="text-gray-600 mt-1">Commentaire: {bilan.testsPhysiques.test_vma_commentaire}</div>
                  )}
                  {bilan.testsPhysiques.test_vma_conseil && (
                    <div className="text-gray-600 mt-1">Conseil: {bilan.testsPhysiques.test_vma_conseil}</div>
                  )}
                </div>
                {renderTestImageButton("VMA", "/images/TEST_VMA.jpg")}
              </div>
            </>,
            <Activity className="h-5 w-5" />,
            'gray'
          )}
          {bilan.testsPhysiques.fatigue_commentaire && renderField(
            "Fatigue",
            <>
              <div className="flex items-center justify-between">
                <div>
                  {bilan.testsPhysiques.fatigue_equilibre && <div>Équilibre: {bilan.testsPhysiques.fatigue_equilibre}</div>}
                  {bilan.testsPhysiques.fatigue_souplesse && <div>Souplesse: {bilan.testsPhysiques.fatigue_souplesse}</div>}
                  {bilan.testsPhysiques.fatigue_force_inf && <div>Force inférieure: {bilan.testsPhysiques.fatigue_force_inf}</div>}
                  {bilan.testsPhysiques.fatigue_force_sup && <div>Force supérieure: {bilan.testsPhysiques.fatigue_force_sup}</div>}
                  {bilan.testsPhysiques.fatigue_endurance && <div>Endurance: {bilan.testsPhysiques.fatigue_endurance}</div>}
                  {bilan.testsPhysiques.fatigue_vma && <div>VMA: {bilan.testsPhysiques.fatigue_vma}</div>}
                  <div className="text-gray-600 mt-1">{bilan.testsPhysiques.fatigue_commentaire}</div>
                </div>
                <div className="ml-4">
                  {renderTestImageButton("Fatigue", "/images/Exercice-sante-a-domicile-Echelle-de-borg.jpg.webp")}
                </div>
              </div>
            </>,
            <Clock className="h-5 w-5" />
          )}
        </>
      )}

      {/* Commentaire global */}
      {bilan.commentaire_global && renderSection(
        "Commentaire global",
        <FileText className="h-6 w-6 text-primary" />,
        <div className="px-4 py-5 sm:px-6">
          <p className="text-gray-900">{bilan.commentaire_global}</p>
        </div>
      )}
    </div>
  );
};

export default BilanDetailPage; 