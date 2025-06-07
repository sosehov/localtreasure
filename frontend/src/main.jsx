import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeRoute from './routes/home/index.jsx';
import ProfileRoute from './routes/profile/index.jsx';
import MainLayout from './MainLayout.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AuthPage from './components/AuthPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route without layout for auth page */}
          <Route path="/auth" element={<AuthPage/>} />
          
          {/* Routes with layout */}
          <Route path="/" element={
            <MainLayout>
              <HomeRoute/>
            </MainLayout>
          } />
          
          <Route path="/profile" element={
            <MainLayout>
              <ProtectedRoute>
                <ProfileRoute/>
              </ProtectedRoute>
            </MainLayout>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)