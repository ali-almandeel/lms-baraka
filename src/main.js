import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";
import { i18n } from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { queryClient } from "./plugins/vueQuery";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

window.__vuetify = vuetify;
app.use(vuetify);
app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
