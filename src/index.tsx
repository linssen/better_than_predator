import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';
import App from './app';
import './assets/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="w-full max-w-5xl font-sans">
        <App />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
