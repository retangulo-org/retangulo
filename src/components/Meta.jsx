import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function Meta({ children, title, canonical, desc }) {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={t('lang')} />
        <title>{title}</title>
        <link rel="canonical" href={canonical} hrefLang={t('lang')} />
        <meta name="description" content={desc} />
      </Helmet>
      {children}
    </HelmetProvider>
  );
}
