<template>
    <div>
        <app-header></app-header>
        <p>This page is only visible to users that are currently logged in</p>
        <button class="open-button" v-on:click="openForm()">Create New Food</button>
        <div class="form-popup" id="myForm">
          <form action="/action_page.php" class="form-container">
            <h2>What food do you want to add?</h2>
            <label for="food"><b>Name of grocery:</b></label>
            <input v-model="food" type="text" placeholder="Enter food name" required><br>

            <label for="expireddate"><b>Expiry Date:</b></label>
            <input v-model="expireddate" type="date" required><br><br>

            <label for="price"><b>Price:</b></label>
            <span> $ <input v-model.number="price" type="number" min="0.00" max="10000.00" step="0.01" />
            </span><br><br>
            
            <label for="username"><b>Name of user:</b></label>
            <input v-model="username" type="text" placeholder="Enter your name"  required><br>
            
            <label for="imgfilename"><b>Upload Image:</b></label>
            <input type="file" id="myFile" @change="onFileChange"><br><br>
            <!-- reference: https://codepen.io/Atinux/pen/qOvawK/?editors=1010 to add file using vue-->

            <button type="submit" class="btn" >Add</button>
            <button type="button" class="btn cancel" v-on:click="closeForm()">Close</button>
          </form>
        </div>
    </div>
</template>

<script>
//Register Locally

import Header from '../components/Header.vue'
//import Footer from './components/Footer.vue'

export default {
 data(){
    return{
      food:"",
      expireddate:"",
      price:"",
      username:"",
      imgfile:"",
    }
  },
   methods:{
    openForm() {
      document.getElementById("myForm").style.display = "block";
    },
    closeForm() {
      document.getElementById("myForm").style.display = "none";
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.imgfile = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    /*addToFirebase(e) {
      e.preventDefault()
        const foodRef = this.$firebaseDatabase.collection('food')
        foodRef.add(
          {
            food:this.food,
            expireddate:this.expireddate,
            price:this.price,
            username:this.username,
            createdOn:new Date(),
          },
        )
        this.name= ''
        this.email = ''
        this.message = ''
        this.submitted = true
        this.snackbar = false
      },*/
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
