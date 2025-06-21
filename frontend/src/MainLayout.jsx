import { ReactNode } from 'react'
import SidebarComponent from '@/components/Sidebar';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';
import logo from "@/assets/logo.png"

 const MainLayout= ({children}) => {
  const { user, logout, isAuthenticated } = useAuth();

  return(
    <div className="main-layout">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">
          
       <div className="flex flex-row items-center justify-center text-center align-center ">
           <img src={logo} className="max-h-[30px] max-w-[30px] mr-4" />
            <h1 className="text-2xl" >LocalTreasure</h1>
            </div>
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
        <main className="main-content w-full">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};
  
  export default MainLayout;