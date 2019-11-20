
<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  data: () => ({
    props: ["penjualanDat"],
    dataSale: { foo: "bar" },
    salesData: {}
  }),
  methods: {
    convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      switch (mnth) {
        case "01":
          return "January";
          break;
        case "02":
          return "February";
          break;
        case "03":
          return "March";
          break;
        case "04":
          return "April";
          break;
        case "05":
          return "May";
          break;
        case "06":
          return "June";
          break;
        case "07":
          return "July";
          break;
        case "08":
          return "August";
          break;
        case "09":
          return "September";
          break;
        case "10":
          return "October";
          break;
        case "11":
          return "November";
          break;
        case "12":
          return "December";
          break;
        default:
          break;
      }
    },

    fetchSales() {
      this.$store.dispatch("getTransactions").then(data => {
        let penjualan = data.penjualanBakso;
        let obj = {};
        penjualan.forEach(jual => {
          const month = this.convert(jual.date);
          if (month) {
            if (!obj[month]) obj[month] = 1;
            else obj[month]++;
          }
        });
        this.salesData = obj;
        this.generateChart();
      });
    },

    generateChart() {
      this.renderChart(
        {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
          datasets: [
            {
              label: "2019",
              data: [
                this.salesData["January"],
                this.salesData["February"],
                this.salesData["March"],
                this.salesData["April"],
                this.salesData["May"],
                this.salesData["June"],
                this.salesData["July"],
                this.salesData["August"],
                this.salesData["September"],
                this.salesData["October"],
                this.salesData["November"],
    
              ],
              backgroundColor: [
                "rgba(71, 183,132,.3)" // Green
              ],
              borderColor: ["#47b784"],
              hoverBackgroundColor: "red"
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 20
                }
              }
            ]
          },

          tooltips: {
            custom: function(tooltip) {
              if (!tooltip) return;
              // disable displaying the color box;
              tooltip.displayColors = false;
            },
            callbacks: {

              label: function(tooltipItem, data) {
                var label = "IDR";

                if (label) {
                  label += ": ";
                }
                let duit = (Math.round(tooltipItem.yLabel * 100) / 100) * 15000;
                label += duit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
                return label;
              }
            }
          }
        }
      );
    }
  },
  mounted() {
    this.fetchSales();
  },
  created() {}
};
</script>

<style>
</style>