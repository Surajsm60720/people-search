'use client';

import { useState, useEffect } from 'react';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { UserDetails } from '../components/UserDetails';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode preference exists in localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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
    // Smooth scroll to user details on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        document.getElementById('user-details')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-indigo-700">
                  People Search
                </span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">An ordinary place to find extraordinary people</p>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeSwitcher darkMode={darkMode} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-blue-400 dark:border-blue-500 border-t-transparent rounded-full animate-pulse"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading users...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700 dark:text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-red-600 dark:text-red-400 underline hover:text-red-800 dark:hover:text-red-300"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Find Your Next Contact</h2>
              <SearchableDropdown 
                users={users} 
                onSelectUser={handleSelectUser}
                clearAfterSelection={true}
                darkMode={darkMode}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tip: Use keyboard arrows ↑↓ to navigate and Enter to select
                </span>
              </p>
            </div>
            
            {selectedUser ? (
              <div id="user-details" className="mt-8 animate-fadeIn">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">User Details</h2>
                <UserDetails user={selectedUser} darkMode={darkMode} />
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="mx-auto w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">No user selected</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                  Search and select a user from the directory to view their details
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-12 py-6 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} People Search App • Powered by Random User API
          </p>
        </div>
      </footer>
    </div>
  );
}