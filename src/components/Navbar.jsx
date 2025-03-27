import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, deleteAccount } from '../store/userSlice';

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
    <nav className="bg-black text-white shadow-md p-4 flex justify-between items-center border-b border-white">
      <div className="flex items-center text-2xl font-bold">
        Algo Root
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="focus:outline-none transform transition-transform hover:scale-105 cursor-pointer"
        >
          <img
            src="/api/placeholder/40/40"
            alt="User"
            className="rounded-full w-10 h-10 border-2 border-white"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-black border border-white rounded-lg shadow-xl z-20">
            <div className="p-3 border-b border-white">
              <p className="font-bold">{user?.username}</p>
              <p className="text-sm text-gray-300">{user?.email}</p>
            </div>
            <ul>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-white hover:text-black cursor-pointer"
              >
                Logout
              </li>
              <li
                onClick={handleDeleteAccount}
                className="px-4 py-2 hover:bg-white hover:text-black text-red-400 cursor-pointer"
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