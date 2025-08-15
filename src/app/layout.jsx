import { useNavigate, useParams, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Root() {
  const SUPPORTED_LANGS = ['pt', 'en'];

  function LanguageSync() {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
      const currentLang = i18n.language.split('-')[0];
      const validLang = SUPPORTED_LANGS.includes(currentLang) ? currentLang : 'en';

      if (lang !== validLang) {
        navigate(`/${validLang}`, { replace: true });
      }
    }, [lang, i18n.language, navigate]);

    return null;
  }

  return (
    <div className="min-h-full">
      <Header />
      <main className="flex justify-center w-full p-4">
        <div className="w-full sm:max-w-[720px]">
          <Outlet />
        </div>
      </main>
      <LanguageSync />
    </div>
  );
}
