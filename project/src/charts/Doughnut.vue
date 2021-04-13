<template>
  <div class="chart">
    <h2>Overview of Food Inventories</h2>
    <doughnut></doughnut>
  </div>
</template>

<script>
import Doughnut from "./doughnut.js";

export default {
  components: {
    'doughnut':Doughnut,
  }
};
</script>

<style>
</style>
