import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AOSProvider } from './States/AOS/AOS.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AOSProvider>
      <App />
    </AOSProvider>
  </React.StrictMode>,
)
