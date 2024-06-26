import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'

import { AOSProvider } from './States/AOS/AOS.tsx'
import { SessionProvider } from './States/Session/Session.tsx'
import { OnlineProvider } from './States/Online/Online.tsx'

//Pages
import Register from './Pages/Register/Register.tsx'
import Login from './Pages/Login/Login.tsx'

//Guards
import LoginGuardRoute from './Guards/LoginGuard/LoginGuard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <OnlineProvider>
          <AOSProvider>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/registrierung' element={<LoginGuardRoute component={Register} />} />
              <Route path='/anmelden' element={<LoginGuardRoute component={Login} />} />
            </Routes>
          </AOSProvider>
        </OnlineProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
