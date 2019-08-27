import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: require('./locales/en.json')
  }
};

i18n.use(LanguageDetector).init({
  resources,
  lng: 'en',
  fallbackLng: 'en'
});

export const _t = (k) => {
  return i18n.t(k);
};