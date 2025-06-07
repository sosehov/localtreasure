import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h1>LocalTreasure</h1>
      </div>
      
      <div className="nav-links">
        {isAuthenticated ? (
          <div className="user-info">
            <span>Welcome, {user?.name}!</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <span>Please login or register</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;