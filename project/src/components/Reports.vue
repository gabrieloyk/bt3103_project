<template>
    <div>
        <app-header></app-header>
        <div class="section" id="overview">
        <personal-statistics></personal-statistics>
        </div>
    </div>
</template>

<script>
//Register Locally

import Header from './Header.vue';
import PersonalStatistics from './PersonalStatistics.vue';
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

