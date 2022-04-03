import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

// antDesign CSS
import 'antd/dist/antd.css';

// router
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
