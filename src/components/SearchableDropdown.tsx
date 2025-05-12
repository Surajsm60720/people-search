'use client';

import { useState, useRef, useEffect } from 'react';
import { User } from '../app/page';

type SearchableDropdownProps = {
  users: User[];
  onSelectUser: (user: User) => void;
};

export const SearchableDropdown = ({ users, onSelectUser }: SearchableDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    setSearchTerm(`${user.name.first} ${user.name.last}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search users by first name..."
          className="w-full p-3 outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setIsOpen(true);
            }}
            className="px-3 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.login.uuid}
                onClick={() => handleSelectUser(user)}
                className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{user.name.first} {user.name.last}</span>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};