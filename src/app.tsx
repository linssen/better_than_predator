import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Result from './result';
import NotFound from './404';

function App():JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/versus/:filmId/:filmSlug/" element={<Result />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
