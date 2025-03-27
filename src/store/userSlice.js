import { createSlice } from '@reduxjs/toolkit';

// Load user from local storage
const loadUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadUserFromStorage(),
    isAuthenticated: !!loadUserFromStorage(),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    deleteAccount: (state) => {
      // Remove user from users list in local storage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const filteredUsers = users.filter(u => u.email !== state.user.email);
      localStorage.setItem('users', JSON.stringify(filteredUsers));

      // Reset state
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    }
  }
});

export const { login, logout, deleteAccount } = authSlice.actions;
export default authSlice.reducer;