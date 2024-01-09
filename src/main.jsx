import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App/App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router basename='https://q-client.onrender.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
)
