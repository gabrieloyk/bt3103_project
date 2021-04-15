<template>
    <div>
        <app-header></app-header>
        <div class="section" id="overview">
        <h1> Who Are We? </h1>
        <p> We are a team of students from NUS, passionate about the environment. 
        Our goal for this app is to create a culture of food tracking in Singapore. </p>
        </div>
        <h1> The Problem</h1>
        <p> Food waste is one of the biggest waste streams in Singapore and the amount of food waste generated has grown by around 20% over the last 10 years. In 2019, Singapore generated around 744 million kg of food waste. That is equivalent to 2 bowls of rice per person per day, or around 51,000 double decker buses.</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/11ycagw4aXE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h1> Reimagining Food Management </h1>
        <p> Avoidable food waste refers to food items that 
        could have been consumed if better managed. 
        Examples of avoidable food waste are leftovers from a meal, 
        expired food, stale food, and blemished fruits and vegetables. 
        Avoidable food waste can be prevent ed by taking food wastage reduction 
        actions such as buying, ordering and cooking only what is needed and adopting smart food storage and preparation practices. 
        This issue is what 'Expired?' aims to solve.</p>
        
        <div class="section" id="overall" style="float: left; width: 45%; height: 260px;">
        <dashboard> </dashboard>
        </div>
        <div style="float: right; width: 55%; height: 260px;">
        <reactivechart> </reactivechart>
        </div>
    </div>
</template>

<script>
//Register Locally

import Header from './Header.vue';
import reactivechart from "../charts/reactivechart.vue"
import Dashboard from "../charts/Dashboard.vue"
//import Footer from './components/Footer.vue'

export default {
 data(){
    return{
      
    }
  },
   methods:{
    
   },
   //Register Locally
  components:{
    'app-header':Header,
    'reactivechart': reactivechart,
    'dashboard': Dashboard
  },
  created(){
      this.currentuser = this.$store.state.user.username  
  },
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;  
  text-align: center;
  color: #4c2792be;
  font-size:14px;
}


</style>

