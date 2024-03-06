import React, { Suspense } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './i18n';
import App from './App';
import './assets/tailwind.css';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
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
