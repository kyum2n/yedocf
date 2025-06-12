import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

import { UserProvider } from './contexts/UserProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>, // 테스트 시 2번 띄움
)