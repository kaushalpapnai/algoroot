import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        dispatch(login(user));
        navigate('/details');
      } else {
        setError({ 
          submit: 'Invalid email or password' 
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl w-full max-w-md sm:w-[450px] border border-gray-200">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-2 sm:mb-3 tracking-tight">Login</h2>
          <p className="text-gray-600 text-xs sm:text-sm">Enter your credentials</p>
        </div>

        {error.submit && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded-lg">
            <p className="text-red-700 font-medium text-sm sm:text-base">{error.submit}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-black ${
                error.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {error.email && (
              <p className="text-red-600 text-xs mt-1 sm:mt-2 font-medium">{error.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-black ${
                error.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {error.password && (
              <p className="text-red-600 text-xs mt-1 sm:mt-2 font-medium">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 px-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-all duration-300 ease-in-out text-sm sm:text-base"
          >
            Sign In
          </button>

          <div className="text-center text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6">
            Don't have an account?{' '}
            <div
              onClick={() => navigate('/signup')}
              className="text-black font-semibold hover:underline cursor-pointer inline-block"
            >
              Create one
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;