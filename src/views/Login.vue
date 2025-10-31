<template>
  <v-container
    class="d-flex justify-center align-center h-screen bg-grey-lighten-4"
  >
    <v-card
      class="pa-8 rounded-2xl shadow-lg"
      elevation="8"
      style="width: 400px"
    >
      <v-card-title class="text-h5 font-weight-bold text-center mb-4">
        {{ $t("login") }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="d-flex flex-column gap-4">
          <v-text-field
            v-model="email"
            :label="$t('email')"
            variant="outlined"
            density="comfortable"
          />
          <v-text-field
            v-model="password"
            :label="$t('password')"
            type="password"
            variant="outlined"
            density="comfortable"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn
          class="w-100 mb-2"
          size="large"
          rounded="lg"
          :loading="loading"
          color="primary"
          @click="submit"
        >
          {{ $t("login") }}
        </v-btn>
        <small class="text-grey">© 2025 Fresh Card</small>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { useUserStore } from "@/stores/user";

export default {
  name: "Login",
  data() {
    return {
      email: "knowledge@hub.com",
      password: "password123",
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        const userStore = useUserStore();
        const success = await userStore.login({
          email: this.email,
          password: this.password,
        });
        if (success) {
          this.$router.replace(this.$route.query.redirect || "/home/dashboard");
        }
      } catch (e) {
        alert("Login failed");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.h-screen {
  height: 100vh;
}
/* .bg-grey-lighten-4 {
  background: #f5f5f5;
} */
</style>
