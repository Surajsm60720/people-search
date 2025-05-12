'use client';

import { useState, useEffect } from 'react';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { UserDetails } from '../components/UserDetails';

export type User = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  gender: string;
  location: {
    country: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    uuid: string;
  };
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://randomuser.me/api/?results=100');
        const data = await response.json();
        setUsers(data.results);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">People Search</h1>
      
      {loading && <p className="text-center">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {users.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <SearchableDropdown 
            users={users} 
            onSelectUser={handleSelectUser} 
          />
          
          {selectedUser && (
            <div className="mt-8">
              <UserDetails user={selectedUser} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}