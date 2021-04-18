<template>
<div>
<h1> Total Food Wastage in Singapore </h1>
<Plotly :data="data" :layout="layout" :display-mode-bar="true"></Plotly>
</div>
</template>

<script>
import { Plotly } from 'vue-plotly'
 
export default {
  components: {
    Plotly
  },
  data() {
    return {
    data:[{
      x: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      y: [641, 676, 703,  796, 789, 786, 791, 810, 763, 744],
      type: "scatter",
      name: "Total Food Waste Generated",
      text: "'000 tonnes",


    },
    {
      x: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      y: [538, 606, 618,  696,  687, 681,  680, 677, 637, 607],
      type:"scatter",
      name: "Food Waste Disposed",
      text: "'000 tonnes",
    },
    {
      x: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      y: [102, 70, 85, 100, 101, 104, 111, 133, 126, 136],
      type:"scatter",
      name: "Food Waste Recycled",
      text: "'000 tonnes",
    }],
    layout: {
      showlegend: true,
      legend: {
        x: 1,
        y: 0.5
      },
      xaxis: {
    title: {
      text: 'Year',
      font: {
        color: '#7f7f7f',
        size: 11
      }
    },
  },
  yaxis: {
    title: {
      text: 'Total Wastage (Thousand tonnes)',
      font: {
        color: '#7f7f7f',
        size: 11
      }
    }
  }

    },
    }
  }
}
</script>