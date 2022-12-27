import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <App />
    {/* <Dashboard/> */}
  </Router>
);

