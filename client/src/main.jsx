import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './Routes.jsx'

import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'
import ToastProvider from './components/toastProvider.jsx'






ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ToastProvider>
    <Router/>
    </ToastProvider>
  
    
   
   
  
     </Provider>
   
  // {/* </React.StrictMode>, */}
)
