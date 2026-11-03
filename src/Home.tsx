import React from 'react';
import { useTranslation } from 'react-i18next';
import Typeahead from './components/Typeahead';
import arrow from './assets/arrow.svg';

function Home(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="justify center pt-10">
      <Typeahead />
      <div className="transform rotate-6 w-3/4 sm:w-1/2 md:w-1/3 mx-auto text-center">
        <div className="w-5 mx-auto mb-5">
          <img src={arrow} alt="" className="h-full w-auto brightness-0 invert" />
        </div>
        <h2 className="text-3xl text-center text-white font-cursive">
          {t('searchInstruction', 'Type any film, and find out if its better than Predator')}
        </h2>
      </div>
    </div>
  );
}

export default Home;
