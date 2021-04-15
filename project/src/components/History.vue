<template>
   <div>
    <aside>
        <nav>
            <ul> 
                <li class="purple" v-for="item in history" :key="item.id">
                    {{item.username}} adds {{item.name}} into the list {{item.temp}} 
                </li>
                <li class="yellow" v-for="item in consume" :key="item.id">
                    {{item.username}} consumes {{item.name}} {{item.temp}}
                </li>
                
            </ul>
        </nav>
    </aside>
    </div>
  
</template>

<script>
import firebase from 'firebase/app';

export default {
  data(){
    return{
        currentuser:'',
        history:[],
        consume:[],
        }
  },
  methods: {
      datediff:function(date1,date2) {
          const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
          const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
          const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
          return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      },
      fetchItems:function(){
      //this function will also update expired state of food in firestore
      firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid)
      .onSnapshot((querySnapShot)=>{
        this.history = []
            let item = {}
        querySnapShot.forEach(doc=>{      
            var today = new Date()
            item=doc.data()
            var itm_created = item.createdOn.toDate()
            var dayDiff = this.datediff(itm_created,today)
            if(dayDiff <= 3)   { //add item that is created within last three days
                if(dayDiff ==0) {
                    item.temp = "today"
                } else if(dayDiff == 1) {
                    item.temp = "one day ago"
                } else if(dayDiff == 2){
                    item.temp = "two days ago"
                } else {
                    item.temp = "three days ago"
                }
                console.log(dayDiff)
                this.history.push(item)
            }
            })      })   
        firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid)
      .onSnapshot((querySnapShot)=>{
        this.consume = []
            let item = {}
        querySnapShot.forEach(doc=>{      
            var today = new Date()
            item=doc.data()
            if(item.consumed == true) {
            var itm_consumed = item.consumedDate.toDate()
            var dayDiff = this.datediff(itm_consumed,today)
            if(dayDiff <= 3)   { //add item that is created within last three days
                if(dayDiff ==0) {
                    item.temp = "today"
                } else if(dayDiff == 1) {
                    item.temp = "one day ago"
                } else if(dayDiff == 2){
                    item.temp = "two days ago"
                } else {
                    item.temp = "three days ago"
                }
                console.log(dayDiff)
                this.consume.push(item)
            }
            }
            })      })  
        },
  },
  created(){
      this.fetchItems(),
      this.currentuser = this.$store.state.user.username  
      },
}
</script>


<style scoped>
aside {
    height:800px;
    background: rgb(255, 246, 230);
    box-sizing: border-box;
    box-shadow: 8px 0px 16px -8px hsla(197, 37, 24, .5);
    display: flex; 
        flex-direction: column;
        justify-content: space-between;
    padding: 20px 5px;
    width: 20%;
    float:left;
    border-color: #b294eb;
    border-width: 9px;
}

.purple { border-left: 5px solid #7a77b9; }
.yellow { border-left: 5px solid #f2c76e; }
li:hover { background-color: #EFEFEF; }
li { 
  width: 18%px; 
  height: 50px;  
  margin: 0 0 20px 0; 
  background: white 97% center no-repeat;
  font-size: 15px;
  color: #333;
  padding: 5px 0 0 20px;
  text-decoration: none;
  font-family: "Segoe UI";
  padding: 0.5em 1em;
  border-radius: 8px;
}

ul {
    margin-bottom: 14px;
    list-style: none; 
    padding:10px 20px 10px 10px;
}

</style>