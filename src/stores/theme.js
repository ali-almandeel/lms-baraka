// stores/theme.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = localStorage.getItem("theme") || "light";
  const isDark = ref(theme === "dark" ? true : false);

  function toggleTheme() {
    isDark.value = !isDark.value;
    document.documentElement.setAttribute(
      "data-theme",
      isDark.value ? "dark" : "light"
    );
    if (window.__vuetify?.theme?.global?.name) {
      window.__vuetify.theme.global.name.value = isDark.value
        ? "dark"
        : "light";
    }
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  }
  return {
    isDark,
    toggleTheme,
    label: computed(() => (isDark.value ? "Light" : "Dark")),
  };
});