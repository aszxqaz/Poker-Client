import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './main.scss'
import 'virtual:fonts.css'
import { enableMapSet } from 'immer'

enableMapSet()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
