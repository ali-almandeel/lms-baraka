<template>
    <v-container class="px-6 d-flex flex-column gap-6 min-h-screen">
        <div class="d-flex justify-space-between align-center">
            <h2 class="text-h4 font-weight-bold">{{ $t("students") }}</h2>
            <span class="text-subtitle-2 text-grey-darken-1">{{ $t("welcome") }} {{ userName }}</span>
        </div>

        <!-- <teachers-table :teachers="teachers" :isLoading="isLoading" :headers="tHeaders" :subjects="subjects" /> -->
        <CoursesTable :students="students" :isLoading="isLoading" :headers="tHeaders" />
    </v-container>
</template>

<script>
import CoursesTable from "@/components/teachers/CoursesTable.vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/user";
// import { id, th } from "vuetify/locale";

export default {
    name: "CoursesView",
    components: {
        CoursesTable
    },
    data() {
        return {
            isLoading: false,
            // teachers: [],
            students: [],
            // subjects: [],
            headerBase: [
                { titleKey: "title", key: "title" },
                { titleKey: "startDate", key: "startDate" },
                { titleKey: "endDate", key: "endDate" },
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
        isLoginPage() {
            return this.$route.name === "Login";
        },
    },
    async mounted() {
        const userStore = useUserStore();
        const teacherId = userStore.user?.id;
        if (!teacherId) {
            console.error("No teacher ID found.")
            return;
        }
        this.isLoading = true;
        try {

            // const subjectsResponse = await api.get("/subjects");
            // this.subjects = subjectsResponse.data;
            // this.isLoading = true;
            const coursesResponse = await api.get(`/teachers/${teacherId}/courses`);
            this.students = coursesResponse.data.map(c => ({
                title: c.title,
                startDate: c.startDate,
                endDate: c.endDate,
            }));
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            this.isLoading = false;
        }
    },
};
</script>
