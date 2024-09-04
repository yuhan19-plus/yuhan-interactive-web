import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie'
import './index.css'
import './assets/common.css'
import './assets/admin/admin.css'
import './assets/client/client.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <CookiesProvider>
            <App />
    </CookiesProvider>
)
