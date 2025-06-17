import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeRoute from './routes/home/index.jsx';
import ProfileRoute from './routes/profile/index.jsx';
import MainLayout from './MainLayout.jsx';
import AuthPage from './components/AuthPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import EventsRoute from './routes/events/index.jsx';
// import FavouriteRoute from './routes/favourites/index.jsx';
import Favourites from './components/Favourites.jsx';
import './App.css';
import './index.css';


export default function App() {
  return (
    <Routes>
      {/* Auth route without layout */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Routes with layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRoute />} />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileRoute />
          </ProtectedRoute>
        } />

        <Route path="/events" element={
          <ProtectedRoute>
            <EventsRoute />
          </ProtectedRoute>
        } />

        <Route path="/favourites" element={
          <Favourites /> // this needs to be moved to protected later
        } />
      </Route>
    </Routes>
  );
}
