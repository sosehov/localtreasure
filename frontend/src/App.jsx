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

import EventCalendar from './components/EventCalendar.jsx';
import MapView from './components/MapView.jsx';



import MessageRooms from './components/messages/MessageRooms.jsx';
import MessageRoom from './components/messages/MessageRoom.jsx';



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
          
        <Route path="/messages" element={
          <ProtectedRoute>
            < MessageRooms />
          </ProtectedRoute>
        } />

        <Route path="/message" element={
          <ProtectedRoute>
            < MessageRoom />
          </ProtectedRoute>
        } />

        <Route path="/map" element={
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  );
}
