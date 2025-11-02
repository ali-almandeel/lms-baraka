<template>
  <v-container class="px-6 d-flex flex-column gap-6 min-h-screen">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center">
      <h2 class="text-h4 font-weight-bold">{{ $t("teachers") }}</h2>
      <span class="text-subtitle-2 text-grey-darken-1">{{ $t("welcome") }} {{ userName }}</span>
    </div>

    <!-- Add Button -->
    <v-btn color="primary" class="mb-4" @click="openAddDialog">
      {{ $t("addTeacher") }}
    </v-btn>

    <!-- Teachers Table -->
    <teachers-table :teachers="teachers" :headers="tHeaders" :subjects="subjects" :isLoading="isLoading"
      @edit="openEditDialog" @delete="openDeleteDialog" @view="openViewDialog" />

    <!-- Teacher Dialog (Add/Edit/View) -->
    <TeacherDialog v-if="dialogVisible" v-model="dialogVisible" :teacher="selectedTeacher" :subjects="subjects"
      :dialogType="dialogType" @save="saveTeacher" />

    <!-- Delete Confirmation -->
    <v-dialog v-model="deleteDialogVisible" max-width="400">
      <v-card>
        <v-card-title>{{ $t("Confirm Delete") }}</v-card-title>
        <v-card-text>{{ $t("Are you sure you want to complete this action?") }}</v-card-text>
        <v-card-actions>
          <v-btn text @click="deleteDialogVisible = false">{{ $t("cancel") }}</v-btn>
          <v-btn color="error" @click="deleteTeacher">{{ $t("delete") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import TeachersTable from "@/components/teachers/TeachersTable.vue";
import TeacherDialog from "@/components/teachers/TeacherDialog.vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/user";

export default {
  name: "TeachersView",
  components: { TeachersTable, TeacherDialog },
  data() {
    return {
      teachers: [],
      subjects: [],
      isLoading: false,
      selectedTeacher: null,
      dialogVisible: false,
      dialogType: "add", // add | edit | view
      deleteDialogVisible: false,
      teacherToDelete: null,
      headerBase: [
        { titleKey: "firstName", key: "firstName" },
        { titleKey: "lastName", key: "lastName" },
        { titleKey: "subjectName", key: "subjectName" },
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
      return this.headerBase.map(h => ({ title: this.$t(h.titleKey), key: h.key }));
    },
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        const [teachersRes, subjectsRes] = await Promise.all([
          api.get("/teachers"),
          api.get("/subjects")
        ]);

        this.teachers = teachersRes.data.map(t => ({
          ...t,
          subjectName: t.subject ? t.subject.name : "",
        }));

        this.subjects = subjectsRes.data.map(s => ({ id: s.id, title: s.name }));
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        this.isLoading = false;
      }
    },

    // Dialog handlers
    openAddDialog() {
      this.selectedTeacher = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subjectId: null,
        salaryPerSession: null,
        notes: "",
        bod: "",
        educationLevel: "",
        universityDegree: "",
        yearsOfExperience: null,
        isActive: true,
        gender: "MALE",
        sessionsCountInMonth: null,
      };
      this.dialogType = "add";
      this.dialogVisible = true;
    },
    openEditDialog(teacher) {
      this.selectedTeacher = { ...teacher }; // clone to avoid mutating table
      this.dialogType = "edit";
      this.dialogVisible = true;
    },
    openViewDialog(teacher) {
      this.selectedTeacher = { ...teacher };
      this.dialogType = "view";
      this.dialogVisible = true;
    },
    openDeleteDialog(teacher) {
      this.teacherToDelete = teacher;
      this.deleteDialogVisible = true;
    },


    async saveTeacher(teacher) {
      try {
        const payload = {
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          phone: teacher.phone,
          subjectId: Number(teacher.subjectId),
          salaryPerSession: Number(teacher.salaryPerSession),
          notes: teacher.notes,
          bod: teacher.bod ? new Date(teacher.bod).toISOString() : null,
          educationLevel: teacher.educationLevel.toUpperCase(),
          universityDegree: teacher.universityDegree,
          yearsOfExperience: Number(teacher.yearsOfExperience),
          isActive: teacher.isActive,
          gender: teacher.gender,
        };

        if (!teacher.id) {
          // New teacher requires a password
          payload.password = teacher.password || "Default123!";
          await api.post("/teachers", payload);
        } else {
          await api.patch(`/teachers/${teacher.id}`, payload);
        }

        this.dialogVisible = false;
        await this.loadData();
      } catch (err) {
        console.error("Failed to save teacher:", err.response?.data || err);
      }
    },


    // Delete
    async deleteTeacher() {
      try {
        await api.delete(`/teachers/${this.teacherToDelete.id}`);
        this.deleteDialogVisible = false;
        await this.loadData();
      } catch (err) {
        console.error("Failed to delete teacher:", err);
      }
    }
  },
};
</script>
