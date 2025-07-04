import api from './api';
import { BilanData } from '../types/bilan';
import toast from 'react-hot-toast';

export interface Reference {
  id: number;
  label: string;
}

 
export const bilanService = {
  // Créer un nouveau bilan
  createBilan: async (data: BilanData, clientId: number) => {
    try {
      let payload: any= data;
      payload.clientId = clientId;
      const response = await api.post('/bilans', payload);
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la création du bilan";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Récupérer les références pour le nombre de repas
  getNbRepasRefs: async (): Promise<Reference[]> => {
    try {
      const response = await api.get('/references/nb-repas');
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la récupération des références repas";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Récupérer un bilan par son ID
  getBilanById: async (id: number) => {
    try {
      const response = await api.get(`/bilans/${id}`);
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la récupération du bilan";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Récupérer tous les bilans de l'utilisateur
  getUserBilans: async () => {
    try {
      const response = await api.get('/bilans/user');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      let message = "Erreur lors de la récupération des bilans utilisateur";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Récupérer les bilans d'un utilisateur spécifique
  getUserBilansById: async (userId: number) => {
    try {
      const response = await api.get(`/bilans/user/${userId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      let message = "Erreur lors de la récupération des bilans utilisateur";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Supprimer un bilan
  deleteBilan: async (id: string) => {
    try {
      const response = await api.delete(`/bilans/${id}`);
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la suppression du bilan";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Récupérer les activités de l'utilisateur
  getUserActivities: async () => {
    try {
      const response = await api.get('/bilans/user/activities');
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la récupération des activités utilisateur";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  }
}; 

export default bilanService;