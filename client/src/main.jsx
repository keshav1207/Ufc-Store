import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './routes/router.jsx'

import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
     <Router/>
     </Provider>
   
  </React.StrictMode>,
)
