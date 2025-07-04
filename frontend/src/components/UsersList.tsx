import React from 'react';
import UserCard from './UserCard';
import { User } from '../services/userService';

interface UsersListProps {
  users: User[];
  onUserUpdate?: () => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, onUserUpdate }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-[#002868]">Liste des sportifs</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {users.map((user) => (
          <UserCard key={user.id} utilisateur={user} onUserUpdate={onUserUpdate} />
        ))}
      </div>
    </div>
  );
};

export default UsersList; 