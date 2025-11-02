<template>
    <v-container class="px-6 d-flex flex-column gap-6 min-h-screen">
        <div class="d-flex justify-space-between align-center">
            <h2 class="text-h4 font-weight-bold">{{ $t("students") }}</h2>
            <span class="text-subtitle-2 text-grey-darken-1">{{ $t("welcome") }} {{ userName }}</span>
        </div>

        <v-btn color="primary" class="mb-4" @click="openAddDialog">{{ $t("addStudent") }}</v-btn>

        <students-table :students="students" :headers="tHeaders" :isLoading="isLoading" @edit="openEditDialog"
            @delete="openDeleteDialog" @view="openViewDialog" />

        <student-dialog v-if="dialogVisible" v-model="dialogVisible" :student="selectedStudent" :dialogType="dialogType"
            :key="selectedStudent?.id || 'new'" @save="saveStudent" />

        <v-dialog v-model="deleteDialogVisible" max-width="400">
            <v-card>
                <v-card-title>{{ $t("confirmDelete") }}</v-card-title>
                <v-card-text>{{ $t("areYouSure") }}</v-card-text>
                <v-card-actions>
                    <v-btn text @click="deleteDialogVisible = false">{{ $t("cancel") }}</v-btn>
                    <v-btn color="error" @click="deleteStudent">{{ $t("delete") }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import api from "@/services/api";
import { useUserStore } from "@/stores/user";
import StudentsDialog from "../components/students/StudentsDialog.vue";
import StudentsTable from "../components/students/StudentsTable.vue";

export default {
    name: "StudentsView",
    components: { StudentsTable, StudentsDialog },
    data() {
        return {
            students: [],
            isLoading: false,
            selectedStudent: null,
            dialogVisible: false,
            dialogType: "add",
            deleteDialogVisible: false,
            studentToDelete: null,
            headerBase: [
                { titleKey: "image", key: "imageUrl" },
                { titleKey: "firstName", key: "firstName" },
                { titleKey: "lastName", key: "lastName" },
                { titleKey: "gender", key: "gender" },
                { titleKey: "notes", key: "notes" },
                { titleKey: "actions", key: "actions" },
            ],
        };
    },
    computed: {
        userName() {
            return useUserStore().userName;
        },
        tHeaders() {
            return this.headerBase.map((h) => ({ title: this.$t(h.titleKey), key: h.key }));
        },
    },
    async mounted() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            this.isLoading = true;
            try {
                const res = await api.get("/students");
                // this.students = res.data.map((s) => ({ ...s }));
                this.students = res.data;
            } catch (err) {
                console.error("Failed to load students:", err);
            } finally {
                this.isLoading = false;
            }
        },
        openAddDialog() {
            this.selectedStudent = {
                imageUrl: "",
                firstName: "",
                lastName: "",
                bod: "",
                notes: "",
                gender: "MALE",
                lng: null,
                lat: null,
            };
            this.dialogType = "add";
            this.dialogVisible = true;
        },
        openEditDialog(student) {
            console.log(student);

            this.selectedStudent = { ...student };
            this.dialogType = "edit";
            this.dialogVisible = true;
        },
        openViewDialog(student) {
            this.selectedStudent = { ...student };
            this.dialogType = "view";
            this.dialogVisible = true;
        },
        openDeleteDialog(student) {
            this.studentToDelete = student;
            this.deleteDialogVisible = true;
        },
        async saveStudent(student) {
            try {
                if (!student.id) {
                    await api.post("/students", student);
                } else {
                    await api.patch(`/students/${student.id}`, student);
                }
                this.dialogVisible = false;
                await this.loadData();
            } catch (err) {
                console.error("Failed to save student:", err.response?.data || err);
            }
        },
        async deleteStudent() {
            try {
                await api.delete(`/students/${this.studentToDelete.id}`);
                this.deleteDialogVisible = false;
                await this.loadData();
            } catch (err) {
                console.error("Failed to delete student:", err);
            }
        },
    },
};
</script>
