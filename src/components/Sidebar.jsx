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
    <div className="w-64 bg-white shadow-md h-full fixed left-0 top-0 pt-16">
      <nav className="p-4">
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.path}
              className={`mb-2 ${
                location.pathname === item.path 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-gray-100'
              } rounded-lg`}
            >
              <Link 
                to={item.path} 
                className="flex items-center p-3"
              >
                <span className="mr-3">{item.icon}</span>
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