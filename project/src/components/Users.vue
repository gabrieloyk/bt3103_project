<template>
    <body>
    <div class='div2'>
    <h2>Select User</h2>
    <div class="familyDiv" v-for="member in family" :key="member[0]">
      <button class="btn" v-on:click="currentuser = member[1].username, select()" v-bind:style="{ 'background-image': 'url(' + member[1].imgfile + ')',
      'background-size':'cover','background-position':'center'}">
        <h2 style="color:white; float:center">{{member[1].username}}</h2>
        </button>
      </div>
      <button class="open-button" v-on:click="openForm()">+</button>
        <div class="form-popup" id="myForm">
          <form class="form-container">
            <h2>New User of Expired?</h2>
            <label for="username"><b>Username:</b></label>
            <input v-model="username" type="text" placeholder="Enter your name/role" ><br><br>
            <label for="imgfilename"><b>Upload Profile Picture:</b></label>
            <upload-pro-pics ref="uploadpropic" v-on:addsrc="addImageSrc" ></upload-pro-pics><br>
            <button class="addIcon" type="submit" v-on:click.prevent="addUserFirebase()">Add</button>
            <button type="button" v-on:click="closeForm()">Back</button>
          </form>
        </div>
    </div>
    </body>
</template>

<script>
import firebase from 'firebase/app';
import UploadProPics from './UploadProPics.vue';

export default {
    name: 'SelectUserPage',
    data() {
        return {
          username:"",
          imgfile:"",
          family: [],
          currentuser:""
        };
    },
    components: {
      'UploadProPics':UploadProPics,
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
    addImageSrc(params) {
      this.imgfile = params.src;
    },
    addUserFirebase() {
        const foodRef = firebase.firestore().collection('users')
        const userid = firebase.auth().currentUser.uid
        foodRef.doc(userid).collection('family').doc(this.username)
        .get().then(doc => {
          if (doc.exists) {
            alert('User exists');
          } else {
            foodRef.doc(userid).collection('family').doc(this.username).set({
              username: this.username,
              createdOn: new Date(),
              imgfile: this.imgfile,
            },
            )
            alert('Document added successfully')
          }
          document.getElementById("myForm").style.display = "none";
          this.username = ''
        })
        this.removeFile();
        /*const snapShot = foodRef.doc(userid).collection('family').doc(this.username).get();
        if (snapShot.exists) {
          alert('User already exists')
          return;
        } else {
        foodRef.doc(userid).collection("family").doc(this.username).set(
          {
            username:this.username,
            createdOn:new Date(),
          },
          )//.then(()=>location.reload());
        alert("Document added sucessfully")
        document.getElementById("myForm").style.display = "none";
        this.username=''
        }*/
    },
    removeFile(){
      this.$refs.uploadpropic.removeAllFiles();
    },
    select() {
      if(this.currentuser === "") {
        alert("Please select a user!")
      } else {
        this.$store.commit("chooseUser",this.currentuser);
        this.$router.push({name:"Home"});
      }
    },

    addFamily() {
      //this.family = [];
      const foodRef = firebase.firestore().collection('users')
      const userid = firebase.auth().currentUser.uid

      foodRef.doc(userid).collection('family').onSnapshot((member)=> {
        this.family = [];
        member.docs.forEach((doc)=> {
          this.family.push([doc.id, doc.data()]);
        });
      });
      console.log(this.family);
    },
  },

  created: function() {
    this.addFamily();
  }
};
</script>

<style scoped>
   body { 
        font-family: 'Ubuntu', sans-serif;
        float: center;
        background-image: url('https://images.theconversation.com/files/282104/original/file-20190701-105182-1q7a7ji.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height:100vh;
        padding: 20px 20px;
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
        margin:0 10px;
    }
    .div2 {
        text-align: center;
        padding-top: 5px;
        padding-bottom: 30px;
        background-color: floralwhite;
        border-radius: 20px;
        width:100%;
        top: 50vh;
        left: 50%;
    }
    input {
        padding : 10px;
        border-radius: 5em;
        border-color: rgb(197, 141, 141);
    }
    .form-popup {
      display: none;
    }

    .familyDiv {
      display: inline-block;
      justify-content: center;
      align-items:center;
      flex-wrap: wrap;
    }

    .familyDiv .btn {
      height: 10vh;
      min-height: 8.4rem;
      max-height: 20rem;
      width: 10rem;

      border-radius:50%;
      border:none;
      outline:none;
      margin-top: 2;
      margin-right:2.5rem;
      position: relative;
      cursor: pointer;
      background-repeat:no-repeat;
      background-size: auto;
    }

    .familyDiv .btn:hover{
      box-shadow: inset 0 0 0 5px #9C27B0;
    }

    .familyDiv .btn:focus{
      box-shadow:inset 0 0 0 5px #9C27B0;
    }
    .open-button:hover {
       box-shadow: inset 0 0 0 2px rgba(161, 161, 157, 0.911);
    }

    .open-button{
      border-radius: 50%;
      min-height: 8.4rem;
      max-height: 20rem;
      font-size: 60px;
      border: 5px dashed rgba(180, 180, 178, 0.911);
      background:Transparent;
      color:rgba(180, 180, 178, 0.911);
    }

    .container{
      position:relative
    }

</style>
