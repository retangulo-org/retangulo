import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Meta({ children, title, canonical }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
      </Helmet>
      {children}
    </HelmetProvider>
  );
}
