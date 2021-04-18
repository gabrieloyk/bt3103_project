<template>
  <div id="app">
    <AddToCalendar
      :buttonText="buttonText"
      :title="title"
      :startTime="startTime"
      :endTime="endTime"
      :location="location"
      :details="details"
    />
  </div>
</template>

<script>
import AddToCalendar from './AddToCalendar.vue'
export default {
  name: 'app',
  data() {
    return {
      buttonText: "Add to calendars",
      details: "expiring",
      endTime: new Date('11/22/2019 5:00 pm'),
      location: "",
      startTime: new Date('11/22/2019 5:00 pm'),
      title: "",
    }
  },
  components: {
    AddToCalendar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>