import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const EXTENSION_NAME = 'osb-addon-theme-extension-base'

const TARGET_ID = `OSB-theme-app-extension-${EXTENSION_NAME}`
const TARGET = document.getElementById(TARGET_ID)

ReactDOM.createRoot(TARGET).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
