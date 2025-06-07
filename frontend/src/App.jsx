import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import AuthPage from './components/AuthPage';
import './App.css'

// Main app content component
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <Navigation />

      {isAuthenticated ? (
        <main className="main-content">
          <h2>Welcome to the App!</h2>
          <p>You are successfully logged in.</p>
          {/* Add main app content */}
        </main>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};


// Main App component with AuthProvider
function App() {
   

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
export default App
