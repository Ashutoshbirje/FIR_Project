import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      emergency: "Emergency",
      website: "www.mahapolice.gov.in",
      selectLanguage: "Select Language",
    },
  },
  hi: {
    translation: {
      emergency: "आपातकालीन",
      website: "www.mahapolice.gov.in",
      selectLanguage: "भाषा चुनें",
    },
  },
  mr: {
    translation: {
      emergency: "आपत्कालीन",
      website: "www.mahapolice.gov.in",
      selectLanguage: "भाषा निवडा",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
