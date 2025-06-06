import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeRoute from './routes/home/index.jsx';
import ProfileRoute from './routes/profile/index.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <Routes>
        <Route path= "/"
        element={<HomeRoute/>} />
        <Route path="/profile"
        element={<ProfileRoute/>} />
    </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)