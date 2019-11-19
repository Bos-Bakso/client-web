
<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August"
      ],
      datasets: [
        {
          label: "Income",
          data: [40, 25, 50, 70, 100, 20],
          backgroundColor: [
            "rgba(71, 183,132,.3)" // Green
          ],
          borderColor: ["#47b784"]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style>
</style>
