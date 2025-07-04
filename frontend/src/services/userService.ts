import api from './api';
import toast from 'react-hot-toast';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  coach: boolean;
  admin: boolean;
}

export const userService = {
  // Récupérer tous les utilisateurs
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la récupération des utilisateurs";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Récupérer un utilisateur par son ID
  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la récupération de l'utilisateur";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Mettre à jour le rôle d'un utilisateur (admin uniquement)
  updateUserRole: async (userId: number, role: 'coach' | 'admin', value: boolean): Promise<User> => {
    try {
      const response = await api.put(`/users/${userId}/role`, { role, value });
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la mise à jour du rôle utilisateur";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Rechercher des utilisateurs
  searchUsers: async (query: string): Promise<User[]> => {
    try {
      const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors de la recherche d'utilisateurs";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  },

  // Retirer le rôle d'un utilisateur (admin uniquement)
  removeUserRole: async (userId: number, role: 'coach' | 'admin'): Promise<User> => {
    try {
      const response = await api.put(`/users/${userId}/remove-role`, { role });
      return response.data;
    } catch (error: any) {
      let message = "Erreur lors du retrait du rôle utilisateur";
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