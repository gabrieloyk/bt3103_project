<template>
    <div>
        <app-header></app-header>
        <p>This is reports page</p>
        <div>
        <ul>
          <li v-for="item in items" :key="item.id">
            
            <p id="itemName">{{ item.name }} is expiring on {{item.expiry}}</p>
            
          </li>
        </ul>
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

</style>

