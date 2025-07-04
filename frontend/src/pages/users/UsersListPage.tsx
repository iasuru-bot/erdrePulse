import React, { useState, useEffect, useCallback } from 'react';
import { userService, User } from '../../services/userService';
import { toast } from 'react-hot-toast';
import UsersList from '../../components/UsersList';
import SearchInput from '../../components/common/SearchInput';

const UsersListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  // Fonction pour charger les utilisateurs
  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction de recherche
  const searchUsers = useCallback(async (term: string) => {
    if (!term.trim()) {
      await loadUsers();
      return;
    }

    try {
      setIsLoading(true);
      const results = await userService.searchUsers(term);
      setUsers(results);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      toast.error('Erreur lors de la recherche');
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers]);

  // Gestion de la mise à jour d'un utilisateur
  const handleUserUpdate = useCallback(async () => {
    await loadUsers();
    toast.success('Le rôle de l\'utilisateur a été mis à jour avec succès');
  }, [loadUsers]);

  // Chargement initial
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Recherche en temps réel avec debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchUsers(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, searchUsers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#002868] mb-4">Recherche un sportif, un coach, ...</h1>
        <SearchInput
          placeholder="Rechercher par nom ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002868] mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Aucun utilisateur trouvé</p>
        </div>
      ) : (
        <UsersList users={users} onUserUpdate={handleUserUpdate} />
      )}
    </div>
  );
};

export default UsersListPage; 