import { User } from '../app/page';

type UserDetailsProps = {
  user: User;
  darkMode?: boolean;
};

export const UserDetails = ({ user, darkMode = false }: UserDetailsProps) => {
  return (
    <div className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } rounded-xl shadow-lg overflow-hidden transition-colors duration-300 hover:shadow-xl border`}>
      <div className="relative">
        {/* Background gradient header - works in both light and dark mode */}
        <div className="h-21 bg-gradient-to-l from-red-400 to-indigo-700"></div>
        
        {/* User avatar positioned over the gradient */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative w-24 h-24">
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className={`w-24 h-24 rounded-full object-cover ${
                darkMode ? 'border-4 border-gray-800' : 'border-4 border-white'
              }`}
            />
          </div>
        </div>
      </div>
      
      <div className="pt-16 pb-6 px-6">
        <div className="text-center mb-4">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {user.name.first} {user.name.last}
          </h2>
          <span className="inline-block px-3 py-1 mt-1 text-xs font-medium text-white bg-blue-500 rounded-full">
            {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className={`flex items-center p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg transition-colors duration-300`}>
            <div className={`${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-500'} p-2 rounded-full mr-3 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} break-all`}>{user.email}</p>
            </div>
          </div>
          
          <div className={`flex items-center p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg transition-colors duration-300`}>
            <div className={`${darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-500'} p-2 rounded-full mr-3 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{user.phone}</p>
            </div>
          </div>
          
          <div className={`flex items-center p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg transition-colors duration-300`}>
            <div className={`${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-500'} p-2 rounded-full mr-3 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Country</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{user.location.country}</p>
            </div>
          </div>
          
          <div className={`flex items-center p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg transition-colors duration-300`}>
            <div className={`${darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-500'} p-2 rounded-full mr-3 transition-colors duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>User ID</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{user.login.uuid.substring(0, )}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};