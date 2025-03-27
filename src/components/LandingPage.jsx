import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className="w-full max-w-md mx-auto mt-48 p-6 bg-white">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to PopX</h1>
          <p className="text-gray-500">
            you can create an account or login to your existing account i have added supabase authentication
          </p>
        </div>
        
        <div className="space-y-4 pt-4">
          <button className="w-full py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition-colors"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </button>
          
          <button className="w-full py-3 bg-purple-200 text-gray-800 font-medium rounded-md hover:bg-purple-300 transition-colors"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;