import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout , deleteAccount } from '../store/userSlice';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src="/api/placeholder/100/50" 
          alt="Algo Root Logo" 
          className="h-10"
        />
      </div>
      
      <div className="relative">
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center focus:outline-none"
        >
          <img 
            src="/api/placeholder/40/40" 
            alt="User" 
            className="rounded-full w-10 h-10"
          />
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20">
            <div className="p-3 border-b">
              <p className="font-bold">{user?.username}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <ul>
              <li 
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
              <li 
                onClick={handleDeleteAccount}
                className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
              >
                Delete Account
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;