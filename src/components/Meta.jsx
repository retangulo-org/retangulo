import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Meta({ children, title, canonical, desc }) {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang={localStorage.getItem('i18nextLng')} />
        <title>{title}</title>
        <link rel="canonical" href={canonical} hrefLang={localStorage.getItem('i18nextLng')} />
        <meta name="description" content={desc} />
      </Helmet>
      {children}
    </HelmetProvider>
  );
}
