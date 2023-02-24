import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import toml from 'toml'

const config = toml.parse(fs.readFileSync(resolve(__dirname, 'src', 'shopify.theme.extension.toml'), 'utf8'))
const EXTENSION_NAME = config.name

const TARGET_ID = `OSB-theme-app-extension-${EXTENSION_NAME}`
const TARGET = document.getElementById(TARGET_ID)

ReactDOM.createRoot(TARGET).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
