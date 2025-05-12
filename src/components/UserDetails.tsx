import { User } from '../app/page';

type UserDetailsProps = {
  user: User;
};

export const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row items-center">
        <img
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />
        
        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">
            {user.name.first} {user.name.last}
          </h2>
          
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-semibold">Gender:</span> {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {user.location.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};