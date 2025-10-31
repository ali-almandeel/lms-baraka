<!-- 
<template>
    <v-container class="px-6 d-flex flex-column gap-6 min-h-screen">
        <div class="d-flex justify-space-between align-center">
            <h2 class="text-h4 font-weight-bold">{{ $t("teachers") }}</h2>
            <span class="text-subtitle-2 text-grey-darken-1">{{ $t("welcome") }} {{ userName }}</span>
        </div>

        <v-data-table :headers="tHeaders" :items="teachers" class="elevation-3 px-2">
            <template v-slot:item.imageUrl="{ item }">
                <v-avatar size="40">
                    <img :src="item.imageUrl" alt="Avatar" />
                </v-avatar>
            </template>

            <template v-slot:item.contact="{ item }">
                <v-icon icon="mdi-cellphone" size="15"></v-icon>
                {{ item.phone }}
                <br />
                <v-icon icon="mdi-email" size="15"></v-icon>
                {{ item.email }}
            </template>

            <template v-slot:item.subjectName="{ item }">
                {{ getSubjectName(item.subjectId) }}
            </template>

            <template v-slot:item.status="{ item }">
                <span :class="item.isActive ? 'text-green' : 'text-red'">
                    {{ item.isActive ? $t("Active") : $t("Inactive") }}
                </span>
            </template>
            <template v-slot:Actions>
                
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import api from "@/services/api";
import { useUserStore } from "@/stores/user";

export default {
    name: "TeachersView",
    data() {
        return {
            teachers: [],
            subjects: [],
            headerBase: [
                { titleKey: "image", key: "imageUrl" },
                { titleKey: "firstName", key: "firstName" },
                { titleKey: "lastName", key: "lastName" },
                { titleKey: "subject", key: "subjectName" },
                { titleKey: "Contact", key: "contact" },
                { titleKey: "Status", key: "status" },
            ],
        };
    },
    computed: {
        userName() {
            return useUserStore().userName;
        },
        tHeaders() {
            return this.headerBase.map(h => ({
                title: this.$t(h.titleKey),
                key: h.key,
            }));
        },
    },
    methods: {

        getSubjectName(subjectId) {
            const subject = this.subjects.find((s) => s.id === subjectId);
            return subject ? subject.name : "No Subject Assigned";
        },
    },
    async mounted() {
        try {
            // Prefetch all subjects
            const subjectsResponse = await api.get("/subjects");
            this.subjects = subjectsResponse.data;

            // Fetch teachers
            const teachersResponse = await api.get("/teachers");
            this.teachers = teachersResponse.data.map((t) => ({
                firstName: t.firstName,
                lastName: t.lastName,
                subjectId: t.subjectId,
                phone: t.phone,
                email: t.email,
                isActive: t.isActive,
                imageUrl: t.imageUrl,
            }));
        } catch (error) {
            console.error("Failed to load data", error);
        }
    },
};
</script> -->

<template>
  <v-container class="px-6 d-flex flex-column gap-6 min-h-screen">
    <div class="d-flex justify-space-between align-center">
      <h2 class="text-h4 font-weight-bold">{{ $t("teachers") }}</h2>
      <span class="text-subtitle-2 text-grey-darken-1">{{ $t("welcome") }} {{ userName }}</span>
    </div>

    <teachers-table :teachers="teachers" :isLoading="isLoading" :headers="tHeaders" :subjects="subjects" />
  </v-container>
</template>

<script>
import TeachersTable from "@/components/teachers/TeachersTable.vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/user";
// import { id, th } from "vuetify/locale";

export default {
  name: "TeachersView",
  components: {
    TeachersTable
  },
  data() {
    return {
      isLoading: false,
      teachers: [],
      subjects: [],
      headerBase: [
        // { titleKey: "image", key: "imageUrl" },
        { titleKey: "firstName", key: "firstName" },
        { titleKey: "lastName", key: "lastName" },
        { titleKey: "subjectName", key: "subject" },
        { titleKey: "phone", key: "phone" },
        { titleKey: "email", key: "email" },
        { titleKey: "status", key: "status" },
        { titleKey: "actions", key: "actions" },
      ],
    };
  },
  computed: {
    userName() {
      return useUserStore().userName;
    },
    tHeaders() {
      return this.headerBase.map(h => ({
        title: this.$t(h.titleKey),
        key: h.key,
      }));
    },
  },
  async mounted() {
    try {
      // const subjectsResponse = await api.get("/subjects");
      // this.subjects = subjectsResponse.data;
      this.isLoading = true;
      const teachersResponse = await api.get("/teachers");
      this.teachers = teachersResponse.data.map(t => ({
        firstName: t.firstName,
        lastName: t.lastName,
        subject: t.subject.name,
        phone: t.phone,
        email: t.email,
        isActive: t.isActive,
        imageUrl: t.imageUrl,
      }));
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
