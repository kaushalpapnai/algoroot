import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: 'Details',
      path: '/details',
      icon: '📊'
    },
    // You can add more menu items here
  ];

  return (
    <div className="w-64 bg-gray-900 shadow-2xl h-full fixed left-0 top-0 pt-16">
      <nav className="p-4">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`mb-2 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-white text-black'
                  : 'hover:bg-gray-800 text-gray-300 hover:text-white'
              }`}
            >
              <Link
                to={item.path}
                className="flex items-center p-3 font-semibold"
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;