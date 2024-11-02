import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { es } from './translations_es';
import { en } from './translations_en';

const savedLanguage = localStorage.getItem('i18nextLng');

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: es,
            en: en,
        },
        fallbackLng: 'es',
        lng: savedLanguage || 'es',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'i18nextLng',
        },
    })

export default i18n;