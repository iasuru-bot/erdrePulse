import axios from 'axios';



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Ne pas rediriger pour les routes d'authentification
    const isAuthRoute = error.config.url.includes('/auth/');
    
    if (error.response?.status === 401 && !isAuthRoute) {
      // Vérifier si le token est expiré ou invalide
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Rediriger vers la page de login uniquement si on n'est pas déjà sur une page d'auth
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (data: {
    email: string;
    password: string;
    civility: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  },

  deleteAccount: async (token: string) => {
    const response = await api.delete('/auth/delete', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  }
};

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  getProfileById: async (userId: number) => {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  },

  updateProfile: async (profileData: {
    date_naissance?: Date;
    taille_cm?: number;
    adresse?: string;
    complement_adresse?: string;
    code_postal?: string;
    ville?: string;
    activite_professionnelle?: string;
    secteur_activite?: string;
  }) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  deleteProfile: async () => {
    const response = await api.delete('/profile');
    return response.data;
  },

  getProfessions: async () => {
    const response = await api.get('/options/professions');
    return response.data;
  },

  getProfessionsBySecteur: async (secteur: string) => {
    const response = await api.get(`/options/professions/${secteur}`);
    return response.data;
  },

  getSecteurs: async () => {
    const response = await api.get('/options/secteurs');
    return response.data;
  }
};


export default api; 