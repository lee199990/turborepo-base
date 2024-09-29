import App from './App'
import './index.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'

const dom = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

createRoot(document.getElementById('example-root')!).render(dom)
