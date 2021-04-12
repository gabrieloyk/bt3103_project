<template>
  <div class="chart">
    <h2>Overview of Food Status</h2>
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
