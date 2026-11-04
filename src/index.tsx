import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './i18n';
import App from './App';
import './assets/tailwind.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <Suspense fallback={<>...</>}>
      <Router>
        <div className="container mx-auto font-sans">
          <App />
        </div>
      </Router>
    </Suspense>
  </React.StrictMode>,
);
