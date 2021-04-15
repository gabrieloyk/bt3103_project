<template>
  <div class="chart">
    <h2>Contributors of Food Waste</h2>
    <pie-contributor></pie-contributor>
  </div>
</template>

<script>
import Pie from "./piecontributor.js";

export default {
  components: {
    'pie-contributor':Pie,
  }
};
</script>

<style>
</style>
