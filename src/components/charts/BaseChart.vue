<template>
    <canvas ref="chartCanvas"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    name: "BaseChart",
    props: {
        type: { type: String, required: true }, // 'line', 'bar', 'pie', etc.
        chartData: { type: Object, required: true },
        chartOptions: { type: Object, default: () => ({}) }
    },
    mounted() {
        this.renderChart();
    },
    watch: {
        data: {
            deep: true,
            handler() {
                this.chart.destroy();
                this.renderChart();
            }
        }
    },
    methods: {
        renderChart() {
            this.chart = new Chart(this.$refs.chartCanvas, {
                type: this.type,
                data: this.chartData,
                options: this.chartOptions
            });
        }
    },
    beforeUnmount() {
        this.chart.destroy();
    }
}
</script>
