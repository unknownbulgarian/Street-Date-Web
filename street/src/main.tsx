import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'

//Providers
import { AOSProvider } from './States/AOS/AOS.tsx'
import { SessionProvider } from './States/Session/Session.tsx'
import { OnlineProvider } from './States/Online/Online.tsx'

//Other
import { ParticlesComponent } from './Components/ParticlesComponent/ParticlesComponent.tsx'

//Pages
import Register from './Pages/Register/Register.tsx'
import Login from './Pages/Login/Login.tsx'
import Try from './Pages/Try/Try.tsx'
import ProfileArea from './Components/ProfileArea/ProfileArea.tsx'

//Guards
import LoginGuardRoute from './Guards/LoginGuard/LoginGuard.tsx'
import ProtectedRoute from './Guards/ProtectedAreaGuard/ProtectedAreaGuard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <OnlineProvider>
          <AOSProvider>
            <ParticlesComponent />
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/versuchen' element={<LoginGuardRoute component={Try} />} />
              <Route path='/registrierung' element={<LoginGuardRoute component={Register} />} />
              <Route path='/anmelden' element={<LoginGuardRoute component={Login} />} />
              <Route path='/profilbereich' element={<ProtectedRoute component={ProfileArea} />} />
            </Routes>
          </AOSProvider>
        </OnlineProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
