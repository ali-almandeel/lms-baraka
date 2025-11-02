<template>
  <v-main>

    <v-navigation-drawer v-model="drawer" v-if="isAuth" :rail="rail" @mouseenter="rail = false"
      @mouseleave="rail = true" permanent>
      <v-list :lines="false" density="compact" nav>
        <v-list-item v-for="(item, i) in items" :key="i" :prepend-icon="item.icon" :title="item.text" value="starred"
          :to="item.link" router active-class="bg-primary rounded-lg"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <router-view /> -->
  </v-main>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { components } from "vuetify/dist/vuetify.js";

export default {
  name: "SideBar",
  props: {
    items: {
      type: Array,
      required: true
    }
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
  data() {
    return {
      rail: true,
    }
  }
};
</script>
