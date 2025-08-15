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
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    supportedLngs: ['pt', 'en'],
    load: 'languageOnly', // pega apenas 'en' de 'en-US'
  });

// Força salvar apenas a parte do idioma no localStorage
const normalizeLocalStorage = () => {
  const lng = i18n.language;
  if (lng) {
    const langOnly = lng.split('-')[0]; // 'en' de 'en-US'
    localStorage.setItem('i18nextLng', langOnly);
  }
};

// Normaliza assim que a linguagem mudar
i18n.on('languageChanged', normalizeLocalStorage);
// Também normaliza logo após a inicialização
i18n.on('initialized', normalizeLocalStorage);

export default i18n;
