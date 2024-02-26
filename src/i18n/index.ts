import "intl-pluralrules";
// FIX for: i18next::pluralResolver: Your environment seems not to be Intl API compatible

import i18next from "i18next";
import { useLocales } from "expo-localization";

import en from "./locales/en.json";
import ro from "./locales/ro.json";

const defaultLanguage = "en";

const instance = i18next.createInstance();
instance.init({
  fallbackLng: defaultLanguage,
  debug: false,
  ns: "translation",
  resources: {
    en: {
      translation: en,
    },
    ro: {
      translation: ro,
    },
  },
});

export const useTranslation = () => {
  const [locale] = useLocales();
  const languageCode = locale?.languageCode ?? defaultLanguage;
  const t = instance.getFixedT(languageCode);

  return { t, i18n: instance };
};

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
    };
  }
}
