<template>
    <div>
        <h3>Attendance by Course</h3>
        <BaseChart :chart-data="chartData" :chart-options="chartOptions" type="bar" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import BaseChart from "./BaseChart.vue";
import api from "@/services/api";

export default defineComponent({
    name: "AttendanceByCourseChart",
    components: { BaseChart },
    setup() {
        const chartData = ref({
            labels: [],
            datasets: [
                {
                    label: "Attendance",
                    data: [],
                    backgroundColor: "#42b983",
                },
            ],
        });

        const chartOptions = {
            responsive: true,
            plugins: {
                legend: { position: "top" },
            },
        };

        const loadAttendanceByCourse = async () => {
            try {
                // const res = await api.get("/reports/attendance-by-course");
                const res = await api.get(`/reports/attendance-by-course?t=${Date.now()}`);
                console.log("Attendance by course API response:", res.data);

                if (Array.isArray(res.data) && res.data.length) {
                    chartData.value.labels = res.data.map((item) => item.courseTitle ?? "Unknown");
                    chartData.value.datasets[0].data = res.data.map((item) => item.averageAttendanceRate ?? 0);
                } else {
                    // fallback for empty response
                    chartData.value.labels = [];
                    chartData.value.datasets[0].data = [];
                }
                // 🚧 TEMP MOCK DATA (remove later)
                chartData.value.labels = ["Course A", "Course B", "Course C"];
                chartData.value.datasets[0].data = [50, 90, 75];

            } catch (err) {
                console.error("Failed to load attendance by course:", err);
            }
        };

        onMounted(loadAttendanceByCourse);

        return { chartData, chartOptions };
    },
});
</script>
