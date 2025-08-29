import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './translations';

const resources = { pt: { translation: {} }, en: { translation: {} }, es: { translation: {} } };
Object.keys(translations).forEach((key) => {
  Object.keys(translations[key]).forEach((lang) => {
    if (!resources[lang]) resources[lang] = { translation: {} };
    resources[lang].translation[key] = translations[key][lang];
  });
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en', 'es'],
    load: 'languageOnly',
    interpolation: { escapeValue: false },

    detection: {
      order: ['path'],
      lookupFromPathIndex: 0,
      caches: [],
      checkWhitelist: true,
    },
  });

export default i18n;
