<template>
  <v-main >

    <v-navigation-drawer v-model="drawer" v-if="isAuth" :rail="rail" @mouseenter="rail = false"
      @mouseleave="rail = true" permanent>
      <v-list :lines="false" density="compact" nav>
        <v-list-item v-for="(item, i) in items"  :prepend-icon="item.icon" :title="item.text" value="starred"
          :to="item.link" router active-class="bg-primary rounded-lg"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <router-view /> -->
  </v-main>
</template>

<script>
import { useUserStore } from "@/stores/user";

export default {
  name: "SideBar",
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
  data() {
    return {
      rail: true,
      items: [
                        { text: "Home", icon: "mdi-chart-box", link: "/home/dashboard" },
                { text: "Teachers", icon: "mdi-human-male-board", link: "/home/teachers" },
        // { text: "Home", icon: "mdi-chart-box", link: "/manager" },
        // { text: "Teachers", icon: "mdi-human-male-board", link: "/manager/teachers" },
        // { text: "Courses", icon: "mdi-book-education", link: "/manager/courses" },
        // { text: "Students", icon: "mdi-account-school", link: "/manager/students" },
        // { text: "Buses", icon: "mdi-bus-multiple", link: "/manager/buses" },
        // { text: "Classes", icon: "mdi-google-classroom", link: "/manager/classes" },
      ]
    }
  }
};
</script>
