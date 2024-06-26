import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AOSProvider } from './States/AOS/AOS.tsx'
import { SessionProvider } from './States/Session/Session.tsx'
import { OnlineProvider } from './States/Online/Online.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionProvider>
      <OnlineProvider>
        <AOSProvider>
          <App />
        </AOSProvider>
      </OnlineProvider>
    </SessionProvider>
  </React.StrictMode>,
)
