<template>
    <div>
        <div class="section" id="overview">
          <h2>Overview of Personal Activities This Month</h2>
          <div class="circular color1">
            <h1 class="ui-value">${{expense}}</h1>
            <span class="ui-label">Expense</span>
          </div>

          <div class="circular color2">
            <h1 class="ui-value">{{expireditems.length}}</h1>
            <span class="ui-label">Expired Food</span>
          </div>
          
          <div class="circular color3">
            <h1 class="ui-value">{{items.length}}</h1>
            <span class="ui-label">Fresh Food</span>
          </div>
          
          <div class="circular color4">
            <h1 class="ui-value">{{consumed.length}}</h1>
            <span class="ui-label">Consumed Food</span>
          </div>
            
        </div>
    </div>
</template>

<script>
//Register Locally
import firebase from 'firebase/app';

export default {
 data(){
    return{
      items: [], //in this case only non-expired personal items are fetched
      currentuser:"",
      expireditems:[], //only personal expired items are fethched
      expense:0,
      consumed:[]
    }
  },
   methods:{
     fetchItems:function(){
      firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid)
      .where("username","==", this.currentuser)
      .onSnapshot((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            var today = new Date()
            item=doc.data()
            if(item.createdOn.toDate().getMonth() === today.getMonth()) {
              this.expense += doc.data().price
                if(item.expired == true && item.consumed == false) {
                    this.expireditems.push(item)
                    console.log(item.name)
                } else if(item.consumed == true) {
                  this.consumed.push(item) 
               } else {
                  this.items.push(item)
               }
             }
                  
            })      })   
        },
   },
  created(){
      this.currentuser = this.$store.state.user.username,  
      this.fetchItems()
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

