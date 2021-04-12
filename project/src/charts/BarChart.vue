<template>
  <div class="chart">
    <h2>Overview of Family's Expense</h2>
    <bar-chart></bar-chart>
  </div>
</template>

<script>
import Bar from "./barchart.js";

export default {
  components: {
    'bar-chart':Bar
  }
};
</script>

<style>
</style>
