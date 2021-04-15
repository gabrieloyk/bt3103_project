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
      type:"scatter"
    }],
    
    }
  }
}
</script>