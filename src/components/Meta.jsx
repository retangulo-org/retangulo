import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Meta({ children, title, canonical, desc }) {
  return (
    <HelmetProvider>
      <Helmet>
        <html />
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={desc} />
      </Helmet>
      {children}
    </HelmetProvider>
  );
}
