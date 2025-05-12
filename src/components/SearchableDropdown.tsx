'use client';

import { useState, useRef, useEffect } from 'react';
import { User } from '../app/page';

type SearchableDropdownProps = {
  users: User[];
  onSelectUser: (user: User) => void;
  clearAfterSelection?: boolean;
  darkMode?: boolean;
};

export const SearchableDropdown = ({ 
  users, 
  onSelectUser,
  clearAfterSelection = false,
  darkMode = false
}: SearchableDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    if (clearAfterSelection) {
      setSearchTerm('');
    } else {
      setSearchTerm(`${user.name.first} ${user.name.last}`);
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
    }

    if (filteredUsers.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredUsers.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev > 0 ? prev - 1 : filteredUsers.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectUser(filteredUsers[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlighted = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlighted) {
        highlighted.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className={`flex items-center border-2 rounded-lg overflow-hidden shadow-sm transition-all duration-300 ${
        isFocused 
          ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900' 
          : 'border-gray-200 dark:border-gray-700'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="pl-3 text-gray-400 dark:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => {
            setIsOpen(true);
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Search users by name..."
          className={`w-full p-3 outline-none placeholder-gray-400 dark:placeholder-gray-500 ${
            darkMode ? 'text-white bg-gray-800' : 'text-gray-700 bg-white'
          }`}
          aria-label="Search users"
          autoComplete="off"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            className="px-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg shadow-xl max-h-80 overflow-y-auto transition-colors duration-300`}>
          <div ref={listRef}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={user.login.uuid}
                  onClick={() => handleSelectUser(user)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex items-center p-3 cursor-pointer transition-colors duration-150 ${
                    highlightedIndex === index 
                      ? darkMode 
                          ? 'bg-blue-900/30 text-blue-200' 
                          : 'bg-blue-50 text-blue-700' 
                      : darkMode
                          ? 'hover:bg-gray-700 text-gray-200'
                          : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="relative mr-3">
                    <div className="relative w-10 h-10">
                      <img
                        src={user.picture.thumbnail}
                        alt={`${user.name.first} ${user.name.last}`}
                        className={`w-10 h-10 rounded-full object-cover ${
                          darkMode ? 'border-2 border-gray-700' : 'border-2 border-white'
                        } shadow-sm`}
                        loading="lazy"
                      />  
                    </div>
                    <div className={`absolute inset-0 rounded-full shadow-inner ${
                      highlightedIndex === index 
                        ? darkMode 
                            ? 'ring-2 ring-blue-500' 
                            : 'ring-2 ring-blue-300'
                        : ''
                    }`}></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name.first} {user.name.last}</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.email.substring(0, 20)}...
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-6 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No users found matching &quot;<span className="font-medium">{searchTerm}</span>&quot;</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            )}
          </div>
          
          {filteredUsers.length > 10 && (
            <div className={`text-xs text-center ${darkMode ? 'text-gray-500 border-gray-700' : 'text-gray-500 border-gray-200'} p-2 border-t transition-colors duration-300`}>
              {filteredUsers.length} users found
            </div>
          )}
        </div>
      )}
    </div>
  );
};