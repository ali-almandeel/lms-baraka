<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <h2 class="text-h4 font-weight-bold">{{ $t("dashboard") }}</h2>
      <span class="text-subtitle-2 text-grey-darken-1">{{ $t("welcome") }} {{ userName }}</span>
    </div>
    <div class="dashboard">
      <!-- Cards -->
      <div class="cards" style="display:flex; gap:1rem; margin-bottom:2rem;">
        <div class="card" v-for="(count, key) in totals" :key="key"
          style="padding:1rem; border: 1px solid gray;  border-radius:8px; flex:1; text-align:center;">
          <h4>{{ $t(key) }}</h4>
          <p style="font-size:1.5rem; font-weight:bold;">{{ count }}</p>
        </div>
      </div>

      <!-- Charts -->
      <div class="charts" style="display:flex; gap:2rem;">
        <div style="flex:1;">
          <AttendanceEvolutionChart />
        </div>
        <div style="flex:1;">
          <AttendanceByCourseChart />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import api from "@/services/api";

// Import our chart components
import AttendanceEvolutionChart from "@/components/charts/AttendanceEvolutionChart.vue";
import AttendanceByCourseChart from "@/components/charts/AttendanceByCourseChart.vue";

export default defineComponent({
  name: "DashboardView",
  components: { AttendanceEvolutionChart, AttendanceByCourseChart },
  setup() {
    const totals = ref({
      Students: 0,
      Teachers: 0,
      Courses: 0,
      Classrooms: 0,
      Buses: 0,
    });

    const loadTotals = async () => {
      try {
        const [studentsRes, teachersRes, coursesRes, classroomsRes, busesRes] = await Promise.all([
          api.get("/reports/students-count"),
          api.get("/reports/teachers-count"),
          api.get("/reports/courses-count"),
          api.get("/reports/classrooms-count"),
          api.get("/reports/buses-count"),
        ]);

        totals.value.Students = studentsRes.data ?? 0;
        totals.value.Teachers = teachersRes.data ?? 0;
        totals.value.Courses = coursesRes.data ?? 0;
        totals.value.Classrooms = classroomsRes.data ?? 0;
        totals.value.Buses = busesRes.data ?? 0;
      } catch (err) {
        console.error("Failed to load totals:", err);
      }
    };

    onMounted(loadTotals);

    return { totals };
  },
});
</script>
