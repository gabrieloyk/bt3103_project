<template>
  <div class="chart">
    <h1>Overview of Food Status</h1>
    <pie-chart></pie-chart>
  </div>
</template>

<script>
import Pie from "./piechart.js";

export default {
  components: {
    'pie-chart':Pie
  }
};
</script>

<style>
</style>
