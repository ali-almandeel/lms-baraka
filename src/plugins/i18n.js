import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

export const RTL_LANGS = ["ar"];

const savedLocale = localStorage.getItem("lan");

export const i18n = createI18n({
  locale: savedLocale ?? "en",
  fallbackLocale: "en",
  messages: { en, ar },
  globalInjection: true,
  legacy: true,
});

export function updateDirection(locale) {
  const isRTL = RTL_LANGS.includes(locale);
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
}

export function switchLanguage(newLocale) {
  i18n.global.locale = newLocale;
  updateDirection(newLocale);
  localStorage.setItem("lan", newLocale);
}

if (savedLocale) {
  i18n.global.locale = savedLocale;
  updateDirection(savedLocale);
} else {
  updateDirection(i18n.global.locale);
}