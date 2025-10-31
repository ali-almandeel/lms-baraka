<template>
  <v-container class=" px-6 d-flex flex-column gap-6 min-h-screen">
    <div class="d-flex justify-space-between align-center">
      <h2 class="text-h4 font-weight-bold">{{ $t("dashboard") }}</h2>
      <span class="text-subtitle-2 text-grey-darken-1"
        >{{ $t("welcome") }} {{ userName }}</span
      >
    </div>

    <v-card
      v-if="posts.length"
      class="rounded-xl overflow-hidden"
      elevation="8"
    >
      <v-card-title class="text-h6 font-weight-bold py-4 px-6"
        >Posts</v-card-title
      >
      <v-divider />
      <v-list lines="one">
        <v-list-item
          v-for="post in posts"
          :key="post.id"
          class="px-6 py-3 hover:bg-grey-lighten-3 transition-all"
        >
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">{{
              post.name
            }}</v-list-item-title>
            <!-- <v-list-item-subtitle class="text-grey-darken-1">{{ post.body }}</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-skeleton-loader v-else type="list-item@4" class="rounded-xl" />
    <!-- <router-view/> -->
  </v-container>
</template>

<script>
import api from "@/services/api";
import { useUserStore } from "@/stores/user";
import { useQuery } from "@tanstack/vue-query";

export default {
  name: "Dashboard",
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    userStore(){
      return useUserStore();
    },
    isAuth() {
      return this.userStore.isAuthenticated;
    },
    userName() {
      const s = useUserStore();
      return s.userName;
      // return this.useUserStore.userName
    },
  },
  async mounted() {

    try {
      const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
          const res = await api.get("/subjects");
          return res.data;
        },
      });
      this.posts = data;
    } catch (e) {
      console.error("Failed to load posts", e);
    }
  },
};
</script>
