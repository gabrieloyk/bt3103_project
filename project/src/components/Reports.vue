<template>
    <div>
        <app-header></app-header>
        <p>This is reports page</p>
    </div>
</template>

<script>
//Register Locally

import Header from '../components/Header.vue'
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
    //'app-footer':Footer
    
  }

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
