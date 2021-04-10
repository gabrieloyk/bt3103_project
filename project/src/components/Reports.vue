<template>
    <div>
        <app-header></app-header>
        <div class="section" id="overview">
          <h2>Overview of Personal Activities This Month</h2>
          <div class="circular color1">
            <h1 class="ui-value">$142</h1>
            <span class="ui-label">Expense</span>
          </div>

          <div class="circular color2">
            <h1 class="ui-value">142</h1>
            <span class="ui-label">Expired Food</span>
          </div>
          
          <div class="circular color3">
            <h1 class="ui-value">58</h1>
            <span class="ui-label">Fresh Food</span>
          </div>
          
          <div class="circular color4">
            <h1 class="ui-value">15</h1>
            <span class="ui-label">Consumed Food</span>
          </div>

            
        </div>
    </div>
</template>

<script>
//Register Locally

import Header from '../components/Header.vue'
import firebase from 'firebase/app';
//import Footer from './components/Footer.vue'

export default {
 data(){
    return{
      items: [],
      currentuser:"",
      expireditems:[],
    }
  },
   methods:{
     fetchItems:function(){
      firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid).onSnapshot((querySnapShot)=>{
        this.items = [];
        this.expireditems = [];
        let item={}
        querySnapShot.forEach(doc=>{
            var today = new Date()
            item=doc.data()
            item.show=false
            item.id=doc.id
            item.expiry = doc.data().expireddate.toDate().toString().substring(0,15)
            if(doc.data().expireddate.toDate()-today < 0) {
              this.expireditems.push(item)
            } else {
              this.items.push(item) 
            }         
            })      })   
        },
   },
   //Register Locally
  components:{
    'app-header':Header,
    //'app-footer':Footer
    
  },
  created(){
      this.fetchItems(),
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
.section { text-align:center }
.circular { 
  position:relative;
  display:inline-block; 
  width:160px; 
  height:160px; 
  margin:30px;
  border-radius:150px; 
  text-align:center; 
  font-family: Arial, sans-serif; 
  box-shadow:inset 0 1px 0 rgba(255,255,255,.8), inset 0 3px 5px rgba(0,0,0,.25); 
  box-sizing:border-box;
}
.color1{
    border:15px solid #ea7186; 
    border-bottom-color:#fff ;
}
.color2{
    border:15px solid #f2c76e; 
    border-bottom-color:#fff 
}
.color3{
    border:15px solid #7a77b9; 
    border-bottom-color:#fff 
}
.color4{
    border:15px solid #bd9bda; 
    border-bottom-color:#fff;
}
.circular .ui-value {
  position:absolute; 
  left:0; 
  right:0;
  top:15px;
  font-size:40px; }
.circular .ui-label { 
  position:absolute;
  left:0;
  bottom:-10px;
  width:100%;
  font-size:14px;
  text-transform:uppercase; 
  color:#888; 
  font-weight:700 }



</style>

