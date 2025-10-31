<template>
  <v-container class="pa-4">
    <h1>{{ $t("hello") }}</h1>
    <p>This is the public home page. Try accessing /dashboard (protected).</p>
    <v-btn @click="switchLocale('en')">EN</v-btn>
    <v-btn @click="switchLocale('ar')">ar</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    switchLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("lan", locale);
    },
  },
};
</script>
