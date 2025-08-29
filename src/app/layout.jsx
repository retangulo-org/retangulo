import { useNavigate, useParams, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Root() {
  const SUPPORTED_LANGS = ['pt', 'en', 'es'];
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // se não tem :lang (rota "/"), deixa o redirect do index.js cuidar
    if (!lang) return;

    // se lang inválido, redireciona para /pt (padrão)
    if (!SUPPORTED_LANGS.includes(lang)) {
      navigate('/pt', { replace: true });
      return;
    }

    // sincroniza i18n com a rota quando necessário
    const current = (i18n.language || '').split('-')[0];
    if (current !== lang) {
      i18n.changeLanguage(lang).catch(() => {});
    }
  }, [lang, i18n, navigate]);

  return (
    <div className="min-h-full">
      <Header />
      <main className="flex justify-center w-full p-4">
        <div className="w-full sm:max-w-[720px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
