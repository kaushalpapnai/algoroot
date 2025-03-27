import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { store } from './store/store';
import Login from './components/Login';
import Signup from './components/Signup';
import DetailsPage from './components/DetailsPage';
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/details" 
            element={
              <PrivateRoute>
                <DetailsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;