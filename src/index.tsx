import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';
import App from './App';
import './assets/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="container mx-auto font-sans">
        <App />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
