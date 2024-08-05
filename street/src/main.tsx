import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'

//Providers
import { AOSProvider } from './States/AOS/AOS.tsx'
import { SessionProvider } from './States/Session/Session.tsx'
import { OnlineProvider } from './States/Online/Online.tsx'
import { BlankProvider } from './States/BlankState/BlankState.tsx'

//Other
import { ParticlesComponent } from './Components/ParticlesComponent/ParticlesComponent.tsx'
import Blank from './Components/Blank/Blank.tsx'

//Pages
import Register from './Pages/Register/Register.tsx'
import Login from './Pages/Login/Login.tsx'
import Try from './Pages/Try/Try.tsx'
import ProfileArea from './Pages/ProfileArea/ProfileArea.tsx'
import Stats from './Pages/Stats/Stats.tsx'
import Games from './Pages/Stats/games/Games.tsx'
import Documentation from './Pages/Documentation/Documentation.tsx'
import Game from './Pages/Stats/games/Game/Game.tsx'
import Upload from './Pages/Upload/Upload.tsx'
import Explore from './Pages/Explore/Explore.tsx'
import ExploreGame from './Pages/Explore/ExploreGame/ExploreGame.tsx'
import Footer from './Components/Footer/Footer.tsx'

//Guards
import LoginGuardRoute from './Guards/LoginGuard/LoginGuard.tsx'
import ProtectedRoute from './Guards/ProtectedAreaGuard/ProtectedAreaGuard.tsx'
import Navbar from './Components/Navbar/Navbar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <OnlineProvider>
          <BlankProvider>
            <ParticlesComponent />
            <Navbar />
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/versuchen' element={<LoginGuardRoute component={Try} />} />
              <Route path='/registrierung' element={<LoginGuardRoute component={Register} />} />
              <Route path='/anmelden' element={<LoginGuardRoute component={Login} />} />
              <Route path='/profilbereich' element={<ProtectedRoute component={ProfileArea} />} />
              <Route path='/statistiken/:publicId' element={<Stats />} />
              <Route path='/statistiken/:publicId/spiele/:page' element={<Games />} />
              <Route path='/statistiken/:publicId/spiele/geschichte/:game' element={<Game />} />
              <Route path='/hochladen/:game' element={<ProtectedRoute component={Upload} />} />
              <Route path='/erkunden/:page' element={<Explore />} />
              <Route path='/erkunden/:page/:game' element={<ExploreGame />} />
              <Route path='/dokumentation' element={<Documentation />} />
            </Routes>
            <Footer />
          </BlankProvider>
        </OnlineProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
