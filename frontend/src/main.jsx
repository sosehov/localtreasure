import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeRoute from './routes/home/index.jsx';
import ProfileRoute from './routes/profile/index.jsx';
import MainLayout from './MainLayout.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AuthPage from './components/AuthPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
          <MainLayout>
              <Routes>
                  <Route path= "/" element={<HomeRoute/>} />
                  <Route path="/auth" element={<AuthPage/>} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfileRoute/>
                    </ProtectedRoute>
                  } />
              </Routes>
          </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)