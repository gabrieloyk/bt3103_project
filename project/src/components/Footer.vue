<template>
  <div class="footer">
    <footer>
        <p v-html="copyRtSymbol"></p>          
    </footer>
    
  </div>
</template>

<script>
export default {
  
  data(){
    return{
        
        copyRtSymbol:'&copy;Team Expired?'
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgb(253, 235, 203);
  border-style: solid;
  border-color: #b294eb;
  color: white;
  text-align: center;
  height:40px;
  opacity: 0.5;
}
p{
    align-content: center;
    color:rgb(105, 105, 105);
}
</style>