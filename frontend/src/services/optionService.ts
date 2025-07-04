import api from './api';
import toast from 'react-hot-toast';

export interface Option {
  id: number;
  category: string;
  value: string;
  label: string;
  order: number;
}

export interface GroupedOptions {
  [category: string]: Option[];
}

export interface NewProfessionData {
  profession: string;
  secteur?: string;
}

export const optionService = {
  // Récupérer toutes les options
  getAllOptions: async (): Promise<GroupedOptions> => {
    try {
      const response = await api.get('/options');
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la récupération des options";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Récupérer les options par catégorie
  getOptionsByCategory: async (category: string): Promise<Option[]> => {
    try {
      const response = await api.get(`/options/${category}`);
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la récupération des options de catégorie";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Ajouter une nouvelle profession
  addNewProfession: async (data: NewProfessionData): Promise<Option> => {
    try {
      const response = await api.post('/options/professions', data);
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de l'ajout de la profession";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Ajouter un nouveau secteur
  addNewSecteur: async (secteur: string): Promise<Option> => {
    try {
      const response = await api.post('/options/secteurs', { secteur });
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de l'ajout du secteur";
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