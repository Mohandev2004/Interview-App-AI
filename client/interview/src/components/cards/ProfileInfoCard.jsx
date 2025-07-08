import React, { useContext } from 'react'; 
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center ">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-semibold shadow-sm">
  {user?.profileImage ? (
    <img
      src={user.profileImage}
      alt="Profile"
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    user?.name?.charAt(0).toUpperCase() || "U"
  )}
</div>

        <div className='px-3'>
          <div className="text-[15px] text-black font-bold leading-3 ">
            {user.name || ""}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;