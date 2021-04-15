import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                fill: false,
                borderColor: 'red'
            }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: ''
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://data.gov.sg/api/action/datastore_search?resource_id=12dd93ba-1d2e-4593-9cc0-9aac83885e9f`)
        .then(response => {
            response.data.result.records.forEach(data => { 
                this.datacollection.labels.push(data.year)
                this.datacollection.datasets[0].data.push(data.total_waste_generated)
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}