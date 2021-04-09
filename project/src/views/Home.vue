<template>
    <div>
        <app-header></app-header>
        {{currentuser}} is using this page
        <p>This page is only visible to users that are currently logged in</p>
        <transmitter></transmitter>
        <div>
        <ul>
          <li v-for="item in items" :key="item.id">
            
            <p id="itemName">{{ item.name }} is expiring on {{item.expiry}}</p>
            
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
              <option>dairy & bakery</option>
              <option>snacks</option>
              <option>beverage</option>
              <option>others</option>
            </select>
            <label for="imgfilename"><b>Upload Image:</b></label>
            <upload-pics ref="uploadfood" v-on:addsrc="addImageSrc"></upload-pics>

            <button type="submit" class="btn" v-on:click.prevent="addToFirebase()">Add</button>
            <button type="button" class="btn cancel" v-on:click="closeForm()">Close</button>
          </form>
        </div>
    </div>
</template>

<script>
//Register Locally

import Header from '../components/Header.vue';
import firebase from 'firebase/app';
import UploadPics from '../components/UploadPics.vue';

//import Footer from './components/Footer.vue'


export default {
 data(){
    return{
      name:"",
      expireddate:"",
      price:"",
      imgfile:"",
      category:"",
      items: [],
      currentuser:""
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
            category: this.category
          },
        ).then(()=> this.reload());
        this.removeFile();
        alert("Document is written successfully")
        this.name=''
        this.expireddate=''
        this.price=''
        this.imgfile=''
        this.category =''
        this.submitted = true
        this.snackbar = false
      },
      fetchItems:function(){
      firebase.firestore().collection('foods').where("userID","==",firebase.auth().currentUser.uid).onSnapshot((querySnapShot)=>{
        this.items = [];
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.show=false
            item.id=doc.id
            item.expiry = doc.data().expireddate.toDate().toString().substring(0,15)
            this.items.push(item) 
            })      })    
        },
      removeFile() {
        this.$refs.uploadfood.removeAllFiles();
      },

      getUser(currentuser) {
        this.currentuser = currentuser;
      }
   },
  created(){
      this.fetchItems(),
      this.currentuser = this.$store.state.user.username  
      },
   //Register Locally
  components:{
    'app-header':Header,
    'UploadPics':UploadPics,
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
* {box-sizing: border-box;}

/* Button used to open the contact form - fixed at the bottom of the page */
.open-button {
  background-color: #555;
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

</style>
