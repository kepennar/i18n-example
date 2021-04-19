import i18n, { ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import { HttpBackendModule } from "./httpBackend";

import french from "./fr.json";
import english from "./en.json";

export const APP_I18N_CODE_KEY = "i18n";

const languageDetector = new LanguageDetector(null, {
  order: ["localStorage"],
  lookupLocalStorage: APP_I18N_CODE_KEY,
  caches: ["localStorage"],
});

export const languages = {
  fr: "Français",
  en: "English",
};
const languageResources: {
  [key in keyof typeof languages]: ResourceLanguage;
} = {
  fr: french,
  en: english,
};
export async function configurei18n() {
  await i18n
    // For an http served resource file. Use `.use(new HttpBackendModule())`
    .use(languageDetector)
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      resources: languageResources,
      fallbackLng: "fr",
      debug: process.env.NODE_ENV === "development",
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
}
export const i18nInstance = i18n;

export function changeLanguage(languageCode: keyof typeof languages) {
  i18n.changeLanguage(languageCode);
}

export function isSupportedLanguageKey(
  value: string
): value is keyof typeof languages {
  return Object.keys(languages).includes(value);
}
