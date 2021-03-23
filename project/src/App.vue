<template>
  <div id="app">
    <app-header></app-header>

    <!--<router-view></router-view>-->

    <app-footer></app-footer>
   </div>
</template>

<script>
//Register Locally

import Header from './components/Header.vue'

export default {
 data(){
    return{
      title:'Your first Vue Component',
      
    }
  },
   methods:{
     
   },
   //Register Locally
  components:{
    'app-header':Header,
    
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;  
  text-align: center;
  color: #4c2792be;
  font-size:14px;
}

</style>
