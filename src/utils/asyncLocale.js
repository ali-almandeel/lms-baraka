import { updateDirection } from "@/plugins/i18n";

export function syncLocale(vuetifyInstance, newLocale) {
    updateDirection(newLocale);

    if (vuetifyInstance && vuetifyInstance.locale) {
        vuetifyInstance.locale.current = newLocale;
    }
}