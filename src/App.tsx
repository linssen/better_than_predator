import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './Home';
import Result from './Result';
import NotFound from './404';

function App(): React.JSX.Element {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
    document.title = t('pageTitle', 'Better Than Predator');
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        t('pageDescription', "Enter any film; find out if it's better than Predator."),
      );
  }, [i18n.language, i18n.resolvedLanguage, t]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/versus/:filmId/:filmSlug/" element={<Result />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
