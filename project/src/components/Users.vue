<template>
    <body>
    <div class='div2'>
      <button class="open-button" v-on:click="openForm()">Add new user</button>
        <div class="form-popup" id="myForm">
          <form class="form-container">
            <h2>New User of Expired?</h2>
            <label for="username"><b>Username:</b></label>
            <input v-model="username" type="text" placeholder="Enter your name/role" ><br>
            <button type="submit" v-on:click.prevent="addUserFirebase()">Add</button>
            <button type="button" v-on:click="closeForm()">Back</button>
          </form>
        </div>
      <button type="button" class="btn" v-on:click="select()">Select</button>
    </div>
    </body>
</template>

<script>
import firebase from 'firebase/app';
export default {
    name: 'SelectUserPage',
    data() {
        return {
          username:"",
        };
    },
   methods:{
    openForm() {
      document.getElementById("myForm").style.display = "block";
    },
    closeForm() {
      document.getElementById("myForm").style.display = "none";
    },
    next() {
      this.$router.push('/users');
    },
    addUserFirebase() {
        const foodRef = firebase.firestore().collection('users')
        const userid = firebase.auth().currentUser.uid
        
        foodRef.doc(userid).collection("family").doc(this.username).set(
          {
            username:this.username,
            createdOn:new Date(),
          },
          )
        alert("Document added sucessfully")
        document.getElementById("myForm").style.display = "none";
        this.username=''
    },
    select() {
      this.$router.push('/home');
    }
  },
};
</script>

<style scoped>
   body { 
        font-family: 'Ubuntu', sans-serif;
        float: center;
        padding: 260px;
        background-image: url('https://images.theconversation.com/files/282104/original/file-20190701-105182-1q7a7ji.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    button {
      cursor: pointer;
        border-radius: 5em;
        color: #fff;
        float: center;
        background: linear-gradient(to right, #9C27B0, #E040FB);
        border: 0;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 10px;
        padding-top: 10px;
        font-family: 'Ubuntu', sans-serif;
        font-size: 13px;
        box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
    }
    .div2 {
        padding-top: 5px;
        padding-bottom: 30px;
        background-color: floralwhite;
    }
    input {
        padding : 10px;
        border-radius: 5em;
        border-color: rgb(197, 141, 141);
    }
    .form-popup {
      display: none;
    }
</style>
