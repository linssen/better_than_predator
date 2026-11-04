import React from 'react';
import { useTranslation } from 'react-i18next';

function NotFound(): React.JSX.Element {
  const { t } = useTranslation();
  return <h1>{t('notFound', 'Not found')}</h1>;
}

export default NotFound;
