import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const TARGET_ID = 'OSB-theme-app-extension-customer-portal'
const TARGET = document.getElementById(TARGET_ID)

ReactDOM.createRoot(TARGET).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
