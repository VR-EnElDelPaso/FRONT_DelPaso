import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { es } from './translations_es';
import { en } from './translations_en';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: es,
            en: en,
        },
        fallbackLng: 'es',
        lng: 'es',
        debug: true,
        interpolation: {
            escapeValue: false,
        }
    })

export default i18n;