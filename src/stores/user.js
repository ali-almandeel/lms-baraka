import { defineStore } from "pinia";
// import authService from "@/services/auth";
import login from "@/services/auth"
export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => (state.user ? state.user.name : ""),
    teacherId: (state) => (state.user ? state.user.id : null)
  },
  actions: {
    async login(credentials) {
      // const { token, user } = await authService.login(credentials);
      const { token, user } = await login(credentials);
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
