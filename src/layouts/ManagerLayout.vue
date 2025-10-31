<template>
  <v-app>
    <!-- Only show sidebar and app bar if not on login page -->
    <template v-if="!isLoginPage">

      <app-bar />
      <side-bar />

    </template>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import 'SideBar.vue'
import AppBar from '../components/ui/AppBar.vue';
import SideBar from '../components/ui/SideBar.vue';
export default {
  name: 'ManagerLayout',
  components: {
    SideBar,
    AppBar
  },
  data() {
    return {
      // drawer: true,
      items: [
        { text: "Home", icon: "mdi-chart-box", link: "/home/dashboard" },
        { text: "Teachers", icon: "mdi-human-male-board", link: "/home/teachers" },
        // { text: "Courses", icon: "mdi-book-education", link: "/manager/courses" },
        // { text: "Students", icon: "mdi-account-school", link: "/manager/students" },
        // { text: "Buses", icon: "mdi-bus-multiple", link: "/manager/buses" },
        // { text: "Classes", icon: "mdi-google-classroom", link: "/manager/classes" },
      ],
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.name === "Login";
    },
  },
};
</script>
