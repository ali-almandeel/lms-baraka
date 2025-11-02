<template>
    <div>
        <h3>Attendance Evolution</h3>
        <BaseChart :chart-data="chartData" :chart-options="chartOptions" type="line" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import api from "@/services/api";
import BaseChart from "./BaseChart.vue";

export default defineComponent({
    name: "AttendanceEvolutionChart",
    components: { BaseChart },
    setup() {
        const chartData = ref({
            labels: [],
            datasets: [
                {
                    label: "Attendance",
                    data: [],
                    borderColor: "#42b983",
                    backgroundColor: "rgba(66, 185, 131, 0.2)",
                },
            ],
        });

        const chartOptions = {
            responsive: true,
            plugins: {
                legend: { position: "top" },
            },
        };

        const loadAttendanceEvolution = async () => {
            try {
                // const res = await api.get("/reports/attendance-evolution");
                const res = await api.get(`/reports/attendance-evolution?t=${Date.now()}`);
                console.log("Attendance evolution API response:", res.data);

                if (Array.isArray(res.data) && res.data.length) {
                    chartData.value.labels = res.data.map((item) => item.date ?? "Unknown");
                    chartData.value.datasets[0].data = res.data.map((item) => item.attendanceRate ?? 0);
                }
                else {
                    chartData.value.labels = [];
                    chartData.value.datasets[0].data = [];
                }
                // 🚧 TEMP MOCK DATA (remove later)
                chartData.value.labels = ["2025-10-29", "2025-10-30", "2025-10-31", "2025-11-01"];
                chartData.value.datasets[0].data = [70, 60, 80, 75];


            } catch (err) {
                console.error("Failed to load attendance evolution:", err);
            }
        };

        onMounted(loadAttendanceEvolution);

        return { chartData, chartOptions };
    },
});
</script>
