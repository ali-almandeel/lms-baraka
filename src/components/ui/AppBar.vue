<!-- <template>
  <v-app-bar app scroll-behavior="elevate" class="px-4 px-md-8">
    <v-toolbar-title class="text-h6 font-weight-bold">
      Fresh Card
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div v-if="isAuth && !$vuetify.display.xs" class="d-flex align-center ga-4">
      <span class="text-body-2 text-grey-darken-1">
        {{ $t("welcome", userName) }}
      </span>
      <svg-icon class="cursor-pointer" type="mdi" :path="path" @click="logout"></svg-icon>
    </div>

    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLocale('en')">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLocale('ar')">
          <v-list-item-title>العربية</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon @click="toggle" :title="label">
      <v-icon v-if="isDark">mdi-weather-sunny</v-icon>
      <v-icon v-else>mdi-weather-night</v-icon>
    </v-btn>

    <div v-if="!isAuth && !$vuetify.display.xs">
      <v-btn rounded="lg" variant="flat" color="primary" :to="{ name: 'Login' }">
        {{ $t("login") }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { useUserStore } from "@/stores/user";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiLogout } from "@mdi/js";
import { useThemeStore } from "../../stores/theme";
import { computed } from "vue";
import { switchLanguage } from "../../plugins/i18n";
import { syncLocale } from "../../utils/asyncLocale";
import { storeToRefs } from "pinia";
export default {
  name: "AppBar",
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiLogout,
    };
  },
  setup() {
    const theme = useThemeStore();
    const { userName } = storeToRefs(useUserStore);
    function toggle() {
      theme.toggleTheme();
    }

    const isDark = computed(() => theme.isDark);
    const label = computed(() => (theme.isDark ? "Light" : "Dark"));

    return { toggle, isDark, label, userName };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    isAuth() {
      return this.userStore.isAuthenticated;
    },
    userName() {
      return this.userStore.userName;
    },
  },
  methods: {
    logout() {
      this.userStore.logout();
      this.$router.push({ name: "Login" });
    },
    changeLocale(newLocale) {
      switchLanguage(newLocale);
      syncLocale(this.$vuetify, newLocale);
    },
  },
};
</script> -->







<template>
  <v-app-bar app scroll-behavior="elevate" class="px-4 px-md-8">
    <v-toolbar-title class="text-h6 font-weight-bold">Fresh Card</v-toolbar-title>

    <v-spacer></v-spacer>

    <div v-if="isAuth && !$vuetify.display.xs" class="d-flex align-center ga-4">
      <span class="text-body-2 text-grey-darken-1">
        {{ $t("welcome", { name: userName }) }}
      </span>
      <svg-icon class="cursor-pointer" type="mdi" :path="path" @click="logout"></svg-icon>
    </div>

    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLocale('en')">
          <v-list-item-title>English</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeLocale('ar')">
          <v-list-item-title>العربية</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Theme toggle button -->
    <v-btn icon @click="toggle" :title="label">
      <v-icon v-if="isDark">mdi-weather-sunny</v-icon>
      <v-icon v-else>mdi-weather-night</v-icon>
    </v-btn>

    <div v-if="!isAuth && !$vuetify.display.xs">
      <v-btn rounded="lg" variant="flat" color="primary" :to="{ name: 'Login' }">
        {{ $t("login") }}
      </v-btn>
    </div>

    <!-- Other buttons, theme toggle, menus, etc. -->
  </v-app-bar>
</template>

<script>
import { useUserStore } from "@/stores/user";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiLogout } from "@mdi/js";
import { useThemeStore } from "../../stores/theme";
import { computed } from "vue";
import { switchLanguage } from "../../plugins/i18n";
import { syncLocale } from "../../utils/asyncLocale";

export default {
  name: "AppBar",
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiLogout,
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    isAuth() {
      return this.userStore.isAuthenticated;
    },
    userName() {
      // Return userName or empty string to avoid undefined display
      return this.userStore.userName || "";
    },
    isDark() {
      return useThemeStore().isDark;
    },
    label() {
      return this.isDark ? "Light" : "Dark";
    },
  },
  methods: {
    logout() {
      this.userStore.logout();
      this.$router.push({ name: "Login" });
    },
    toggle() {
      useThemeStore().toggleTheme();
    },
    changeLocale(newLocale) {
      switchLanguage(newLocale);
      syncLocale(this.$vuetify, newLocale);
    },
  },
};
</script>
