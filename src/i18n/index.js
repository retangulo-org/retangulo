import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './translations';

const resources = { pt: { translation: {} }, en: { translation: {} } };

Object.keys(translations).forEach((key) => {
  Object.keys(translations[key]).forEach((lang) => {
    resources[lang].translation[key] = translations[key][lang];
  });
});

i18n
  .use(LanguageDetector) // 👈 precisa disso
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    supportedLngs: ['pt', 'en'],
    load: 'languageOnly',
  });

const normalizeLocalStorage = () => {
  const lng = i18n.language;
  if (lng) {
    const langOnly = lng.split('-')[0];
    localStorage.setItem('i18nextLng', langOnly);
  }
};

i18n.on('languageChanged', normalizeLocalStorage);
i18n.on('initialized', normalizeLocalStorage);

export default i18n;
