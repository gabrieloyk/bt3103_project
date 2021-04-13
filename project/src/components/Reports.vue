<template>
    <div>
        <app-header></app-header>
        <div class="section" id="overview">
        <personal-statistics></personal-statistics>
        </div>
        <div class="section" id="overall" style="float: left; width: 45%; height: 260px;">
        <pie></pie>
        <doughnut></doughnut>
        </div>
        <div style="float: left; width: 45%; height: 260px;">
          <bar-chart></bar-chart>
        </div>
    </div>
</template>

<script>
//Register Locally

import Header from './Header.vue';
import PersonalStatistics from './PersonalStatistics.vue';
import PieChart from '../charts/PieChart.vue';
import BarChart from '../charts/BarChart.vue';
import Doughnut from '../charts/Doughnut.vue';

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
    'personal-statistics': PersonalStatistics,  
    'pie':PieChart,
    'bar-chart': BarChart,
    'doughnut':Doughnut,
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

