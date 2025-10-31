import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { i18n } from "./i18n";
import { useI18n } from "vue-i18n";
const savedTheme = localStorage.getItem("theme") || "light";

const savedLocale = localStorage.getItem("lan");

const isRtl = savedLocale === "ar" || i18n.global.locale === "ar";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: savedTheme,
    themes: {
      light: {},
      dark: {},
    },
    locale: {
      adapter: createVueI18nAdapter({ i18n, useI18n }),
      rtl: {
        ar: true,
        en: false,
      },
      current: isRtl ? "ar" : "en",
    },
  },
});