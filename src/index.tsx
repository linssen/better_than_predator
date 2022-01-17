import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import './i18n';
import App from './App';
import './assets/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<>...</>}>
      <Router>
        <div className="container mx-auto font-sans">
          <App />
        </div>
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
