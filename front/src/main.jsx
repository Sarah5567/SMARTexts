import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AlertProvider} from "./context/alerts/AlertProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AlertProvider>
        <App />
      </AlertProvider>
  </StrictMode>,
)
