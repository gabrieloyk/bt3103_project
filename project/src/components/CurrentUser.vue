<template>
    <div>
        {{currentuser}} is using this page
    </div>
</template>

<script>
export default {
 data(){
    return{
      currentuser:"",
    }
  },
   methods:{
    
},
  created(){
      this.fetchItems(),
      this.currentuser = this.$route.params.data   
      },
   //Register Locally
  components:{
    
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
* {box-sizing: border-box;}


</style>
