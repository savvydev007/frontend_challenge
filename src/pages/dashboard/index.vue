<template>
  <div v-if="chartData">
    <chart-card
      :chart-data="chartData"
      :chart-options="lineChart.options"
      :responsive-options="lineChart.responsiveOptions"
    >
      <template slot="header">
        <h4 class="card-title">Claims Status</h4>
      </template>
      <template slot="footer">
        <div class="legend">
          <i class="fa fa-circle text-primary"></i> OPEN
          <i class="fa fa-circle text-success"></i> PAID
          <i class="fa fa-circle text-danger"></i> DELETED
        </div>
      </template>
    </chart-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import ChartCard from '@/components/Cards/ChartCard.vue'

@Component({
  name: 'dashboard',
  components: {
    ChartCard,
  },
})
export default class DashboardPage extends Vue {
  chartData: any = null
  lineChart: any = {
    options: {
      low: 0,
      high: 3000,
      showArea: false,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: true,
      showLine: true,
      showPoint: true,
      fullWidth: true,
      chartPadding: {
        right: 50,
      },
    },
    responsiveOptions: [
      [
        'screen and (max-width: 640px)',
        {
          axisX: {
            labelInterpolationFnc(value) {
              return value[0]
            },
          },
        },
      ],
    ],
  }

  async mounted() {
    axios.get('http://localhost:9001/claims').then((res) => {
      let claims: any = {
        OPEN: [],
        PAID: [],
        DELETED: [],
      }

      // initialize
      for (let i = 0; i < 12; i += 1) {
        claims.OPEN[i] = 0
        claims.PAID[i] = 0
        claims.DELETED[i] = 0
      }

      for (let item of res.data) {
        const date = new Date(item.dueDate)
        claims[item.status][date.getMonth()] += item.baseAmount / 1000
      }

      this.chartData = {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        series: [claims.OPEN, claims.PAID, claims.DELETED],
      }
    })
  }
}
</script>
