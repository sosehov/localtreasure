import { ReactNode } from 'react'
import SidebarComponent from '@/components/Sidebar';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';

 const MainLayout= ({children}) => {
  const { user, logout, isAuthenticated } = useAuth();

  return(
    <div className="main-layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">
            <h1>LocalTreasure</h1>
          </Link>
        </div>
          
        <div className="nav-links">
          <Link to="/">Home</Link>
            
          {isAuthenticated ? (
              <>
              <Link to="/profile">Profile</Link>
              <div className="user-info">
                <span>Welcome, {user?.name}!</span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
              <Link to="/auth">Login</Link>
            )}
        </div>
      </nav>
        
      <div className='flex flex-row'>
            <SidebarComponent/>
        <main className="main-content">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};
  
  export default MainLayout;