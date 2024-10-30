import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18n
i18n
	.use(HttpBackend) // Load translations from files
	.use(LanguageDetector) // Detects user language
	.use(initReactI18next) // Passes i18n down to react-i18next
	.init({
		fallbackLng: 'cz', // Default language if detection fails
		supportedLngs: ['cz', 'en'], // Define supported languages
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json', // Path for translation files
		},
		interpolation: {
			escapeValue: false, // React already escapes values to prevent XSS
		},
	});

export default i18n;
