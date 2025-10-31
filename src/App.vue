<template>
  <!-- <v-app>
    <AppBar />
    <SideBar />
  </v-app> -->
  <router-view />
</template>

<script>
import SideBar from "./components/ui/SideBar.vue";
import AppBar from "./components/ui/AppBar.vue";
import { syncLocale } from "./utils/asyncLocale";
import { i18n } from "./plugins/i18n";

export default {
  name: "App",
  components: { SideBar, AppBar },
  mounted() {
    syncLocale(this.$vuetify, i18n.global.locale);
  },
};
</script>
