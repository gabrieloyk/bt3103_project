<template>
    <div>
        <app-header></app-header>
        <history></history>
        <div id="content">
        <img v-bind:src="imgsrc" id="propic" >
        <p> <a id="para">Welcome, </a><a id="user"> {{currentuser}}!</a> </p>
        <div>
        <ul>
          <li class="red" id="list" v-for="item in threedays" :key="item.id" v-show="!item.consumed">
            <div style="display:inline">
            <div id="itemName" v-show="item.daysToExpiry==0">{{ item.name }} is expiring on {{item.expiry}} which is today. <b>Please Consume It By Today! </b> </div>
            <div id="itemName" v-show="item.daysToExpiry==1">{{ item.name }} is expiring on {{item.expiry}} which is tomorrow. <b>Please Consume It ASAP! </b> </div>
            <div id="itemName" v-show="item.daysToExpiry>1">{{ item.name }} is expiring on {{item.expiry}} in {{item.daysToExpiry}} days <b>Please Consume It Soon!  </b> </div>
            <div> <button class="red1" id="consumeBtn" v-on:click="consumed(item.id)"> <b>Consume</b> </button>
           <button class="addToCalendar" id="consumeBtn" v-on:click="addToCalendar(item.expireddate.toDate(), item.name)"> <b>Add To Calendar</b> </button> </div>
            </div>
          </li>
          <li class="yellow" id="list" v-for="item in oneweek" :key="item.id" v-show="!item.consumed">
            <div style="display:inline">
            <div id="itemName">{{ item.name }} is expiring on {{item.expiry}} in {{item.daysToExpiry}} days </div>   
            <div>
            <button class="yellow1" id="consumeBtn" v-on:click="consumed(item.id)"> <b> Consume</b> </button> 
            <button class="addToCalendar" id="consumeBtn" v-on:click="addToCalendar(item.expireddate.toDate(), item.name)"> <b>Add To Calendar</b> </button></div>
            </div>
          </li>
          <li class="green" id="list" v-for="item in items" :key="item.id" v-show="!item.consumed">
            <div style="display:inline">
            <div id="itemName" v-show="Math.floor(item.daysToExpiry/7) <= 1 && item.daysToExpiry - 7*Math.floor(item.daysToExpiry/7) <= 1 ">{{ item.name }} is expiring on {{item.expiry}} in {{Math.floor(item.daysToExpiry/7)}} week and {{item.daysToExpiry - 7*Math.floor(item.daysToExpiry/7)}} day </div>
            <div id="itemName" v-show="Math.floor(item.daysToExpiry/7) > 1 && item.daysToExpiry - 7*Math.floor(item.daysToExpiry/7) <= 1 ">{{ item.name }} is expiring on {{item.expiry}} in {{Math.floor(item.daysToExpiry/7)}} weeks and {{item.daysToExpiry - 7*Math.floor(item.daysToExpiry/7)}} day </div>
            <div id="itemName" v-show="Math.floor(item.daysToExpiry/7) > 1 && item.daysToExpiry - 7*Math.floor(item.daysToExpiry/7) > 1 ">{{ item.name }} is expiring on {{item.expiry}} in {{Math.floor(item.daysToExpiry/7)}} weeks and {{item.daysToExpiry - 7*Math.floor(item.daysToExpiry/7)}} days </div>
            <div> <button class="green1" id="consumeBtn" v-on:click="consumed(item.id)"> <b>Consume</b> </button> 
            <button class="addToCalendar" id="consumeBtn" v-on:click="addToCalendar(item.expireddate.toDate(), item.name)"> <b>Add To Calendar</b> </button> </div>
            </div>
          </li>
        </ul>
        </div>
        <button class="open-button" v-on:click="openForm()">Create New Food</button>
        <div class="form-popup" id="myForm">
          <form class="form-container">
            <h2>What food do you want to add?</h2>
            <label for="name"><b>Name of grocery:</b></label>
            <input v-model="name" type="text" placeholder="Enter food name" ><br>

            <label for="expireddate"><b>Expiry Date:</b></label>
            <input v-model="expireddate" type="date"><br><br>

            <label for="price"><b>Price:</b></label>
            <span> $ <input v-model.number="price" type="number" min="0.00" max="10000.00" step="0.01" />
            </span><br><br>
            
            <select v-model="category">
            <option disabled value="">Select category</option>
              <option>fruits & vegetables</option>
              <option>meat & seafood</option>
              <option>dairy</option>
              <option>staples and bakery</option>
              <option>snacks</option>
              <option>beverage</option>
              <option>others</option>
            </select>
            <label for="imgfilename"><b>Upload Image:</b></label>
            <upload-pics ref="uploadfood" v-on:addsrc="addImageSrc"></upload-pics>

            <button type="submit" class="btn" v-on:click.prevent="addToFirebase()">Add</button>
            <button type="button" class="btn cancel" v-on:click="closeForm()">Close</button>
            <button v-on:click.prevent="addToCalendar()"> Add to Calendar </button>
          </form>
          </div>
        </div>
    </div>
</template>

<script>
//Register Locally

import Header from '../components/Header.vue';
import firebase from 'firebase/app';
import UploadPics from '../components/UploadPics.vue';
import History from '../components/History.vue';


//import Footer from './components/Footer.vue'


export default {
 data(){
    return{
      name:"",
      expireddate:"",
      price:"",
      imgfile:"",
      category:"",
      threedays:[], //fopd expiring in three days
      oneweek:[], //food expiring in one week
      items:[],//the rest of the items
      currentuser:"",
      expired:false,
      imgsrc:"",
    }
  },
   methods:{
    openForm() {
      document.getElementById("myForm").style.display = "block";
    },
    closeForm() {
      document.getElementById("myForm").style.display = "none";
    },
    addImageSrc(params) {
      this.imgfile = params.src;
    },
    addToFirebase() {
        var today = new Date()
        //to check if user inputted an expired food
        if(new Date(this.expireddate) - today +  1000 * 60 * 60 * 16 < 0 ) {this.expired=true} 
        const foodRef = firebase.firestore().collection('foods')
        foodRef.add(
          {
            name:this.name,
            expireddate:new Date(this.expireddate),
            price:this.price,
            username:this.currentuser,
            createdOn:new Date(),
            userID: firebase.auth().currentUser.uid,
            imgfile: this.imgfile,
            category: this.category,
            consumed: false,
            expired: this.expired,
            consumedDate: new Date(),
            consumedBy:"",
          },
        )
        this.removeFile();
        this.name=''
        this.expireddate=''
        this.price=''
        this.imgfile=''
        this.category =''
        this.submitted = true
        this.snackbar = false
        this.expired = false
      },
      datediff:function(date1,date2) {
          const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
          const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
          const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
          return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      },
      fetchItems:function(){
      //this function will also update expired state of food in firestore
      firebase.firestore().collection('foods')
      .where("userID","==",firebase.auth().currentUser.uid)
      .onSnapshot((querySnapShot)=>{
        this.items = [];
        this.threedays =[];
        this.oneweek = [];
        let item={}
        querySnapShot.forEach(doc=>{
            var today = new Date()
            item=doc.data()
            item.expired= (item.expireddate.toDate() - today + 1000 * 60 * 60 * 16 < 0) ? true : false 
            //update expired state in firestore
            firebase.firestore().collection('foods').doc(doc.id).update({expired:item.expired})
            item.show=false
            item.id=doc.id
            item.expiry = doc.data().expireddate.toDate().toString().substring(0,15)
            item.daysToExpiry = this.datediff(today, item.expireddate.toDate())
            if((!item.consumed) && (!item.expired)) {
              if (this.datediff(today, item.expireddate.toDate()) <= 3) {
              this.threedays.push(item)
              console.log("DEBUG")
            console.log(item.name)
            console.log(item.daysToExpiry >1)
            } else if (this.datediff(today,item.expireddate.toDate()) <= 7) {
              this.oneweek.push(item)
              console.log("DEBUG")
            console.log(item.name)
            console.log(item.daysToExpiry)
            } else {
              this.items.push(item)  
              console.log("DEBUG")
            console.log(item.name)
            console.log(item.daysToExpiry)
            }
            } 
            })      })  
            //to get profile pic source
            const userid = firebase.auth().currentUser.uid
            firebase.firestore().collection('users')
            .doc(userid).collection('family').where('username',"==",this.currentuser)
            .get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.imgsrc = doc.data().imgfile
                console.log(doc.id, " => ", doc.data());
        });
       
    })
      },
      removeFile() {
        this.$refs.uploadfood.removeAllFiles();
      },

      getUser(currentuser) {
        this.currentuser = currentuser;
      },
      consumed: function(itemId) {
                
                firebase.firestore().collection('foods').doc(itemId).update({
                  consumed:true,
                  consumedDate:new Date(),
                  consumedBy:this.currentuser,
                }).then(() => {
                    console.log("Consumed state!");
                })           
      },
      addToCalendar(expiryDate, foodName) {
      var googleCalendarLink = `http://www.google.com/calendar/event?action=TEMPLATE&text=${this.title || foodName + " EXPIRING TODAY"}&dates=${this.formatDate(expiryDate)}/${this.formatDate(expiryDate)}&details=${foodName || ""}`
      window.open(googleCalendarLink, '_blank');
    },
    formatDate(d) {
      var date = d;
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      let formatted_date;
      if(hour === 0 && minutes === 0) {
        formatted_date = ("" + year) + this.zero_pad2(monthIndex + 1) + this.zero_pad2(day);
      } else {
        formatted_date = ("" + year) + this.zero_pad2(monthIndex + 1) + this.zero_pad2(day) + "T" + this.zero_pad2(hour) + this.zero_pad2(minutes) + "00Z";
      }
      return formatted_date;
    },
    zero_pad2(num) {
      if(num < 10) return "0" + num;
        return num;
    }
   },
  created(){
      this.currentuser = this.$store.state.user.username,
      this.fetchItems()
  },
   //Register Locally
  components:{
    'app-header':Header,
    'upload-pics':UploadPics,
    //'app-footer':Footer,
    'history' :History,
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

#propic {
  max-width:100%;
	height:150px;
  border-radius:50%;
}

/* Button used to open the contact form - fixed at the bottom of the page */
.open-button {
  background-color: #7a77b9;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  position: fixed;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
  
}

/* Add styles to the form container */
.form-container {
  max-width: 500px;
  padding: 10px;
  background-color: white;
  height:500px;
  overflow-y: auto;
}

/* Full-width input fields */
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type=text]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

#list {
  color: lightslategrey;
  padding: 1px;
}

#user {
  color: #b294eb;
  font-family: Chalkduster, fantasy;
  font-size: 23px;
}

#para {
  font-family: Chalkduster, fantasy;
  font-size: 25px;
  color:#555
}

#content {
  width:80%;
  float: right;
  padding: 20px;
}


.red{
  border-left: 5px solid #ea7186;
  border-right: 5px solid #ea7186;
}
.yellow{ 
  border-left: 5px solid #f2c76e; 
  border-right: 5px solid #f2c76e; 
  }
.green{ 
  border-left: 5px solid #9bc472; 
  border-right: 5px solid #9bc472; 
  }

li:hover { background-color: #EFEFEF; }
li { 
  width: 60%px; 
  height: 60px;  
  margin: 0 0 15px 0; 
  background: rgb(255, 246, 230) 97% center no-repeat;
  font-size: 15.5px;
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

#consumeBtn {
    border: transparent;
    padding: 8px;
    border-radius: 3px;
    color: white;
    position:relative;
    margin-left: 25px;
    margin: 5px;
    font-size:11px;
}
.red1:hover {
  background-color: #af5765;
}
.red1{
  background: #ea7186;
}
.yellow1:hover {
  background-color: #e4ab3b;
}
.yellow1{ 
  background: #f2c76e; 
  }
.green1:hover {
  background-color: #68854c;
}
.green1{ 
  background:  #9bc472; 
  }
.addToCalendar:hover {
  background-color: #4897af;
}
.addToCalendar {
  background:  #5dc4e4; 
}
</style>
