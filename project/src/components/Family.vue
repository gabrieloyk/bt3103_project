<template>
    <div>
        <app-header></app-header>
        <p id="welcome">Welcome to the family!</p>
        <div class="wrapper">
          <div class="card" v-for="profile in profiles" v-bind:key="profile.username" v-on:dblclick="profile.show = !profile.show" v-on:click="selected = profile.id"
          :class="{active:profile.id === selected}">
            <a>
            <img v-bind:src="profile.imgfile"/>
            <br>
            <b>{{profile.username}}</b>
            </a>
            <span class="hide">Click 2x<br></span>
            <div v-show="profile.show">
              <br>
              <button v-on:click="deleteProfile(profile.id)" class="btn">Delete</button>
              <br>
              <button v-on:click="edit=true" class="btn">Edit Pic</button>
            </div>
          </div>
        </div>
        <div v-show="edit">
          <form>
            <h2>Edit Profile Pic</h2>
            <label for="imgfilename"><b>New Profile Pic:</b></label>
            <upload-pro-pics ref="uploadpropic" v-on:addsrc="addImageSrc" ></upload-pro-pics>
            <button class='btn' v-on:click.prevent="updateProf(selected)">Update</button>  
            <button class="btn" v-on:click.prevent="edit=false">Back</button>
          </form><br>
        </div>
        <button id="confirmButton" v-on:click="confirm()" class="btn">Confirm</button><br><br><br>
    </div>
</template>

<script>
//Register Locally

import Header from '../components/Header.vue'
import firebase from 'firebase/app'
import UploadProPics from './UploadProPics.vue';
//import Footer from './components/Footer.vue'

export default {
 data(){
    return{
      profiles: [],
      selected: null,
      edit: false,
      imgfile:''
    }
  },
   methods:{
     fetchItems() {
       const userid = firebase.auth().currentUser.uid
       firebase.firestore().collection('users').doc(userid).collection('family').onSnapshot((querySnapShot) => {
         this.profiles = [];
         let profile = {}
         querySnapShot.docs.forEach((doc) =>{
           profile = doc.data()
           profile.show = false
           profile.id = doc.id
           this.profiles.push(profile)
         })
       })
     },

     deleteProfile(profileid) {
       if (profileid === this.$store.state.user.username) {
         this.$store.commit("chooseUser",'')
       } else {
       const userid = firebase.auth().currentUser.uid
       firebase.firestore().collection('users').doc(userid).collection('family').doc(profileid).delete()
       .then(()=> {location.reload()});
       }
     },

     confirm() {
       if (this.selected === null) {
         alert("No User Selected")
       } else {
         this.$store.commit("chooseUser",this.selected);
         this.$router.push({name:"Home"});
       }
     },

      addImageSrc(params) {
        this.imgfile = params.src;
      },

      updateProf(profid) {
        if (this.imgfile == '') {
          alert("Please upload a profile pic")
        } else {
        const userid = firebase.auth().currentUser.uid
        firebase.firestore().collection('users').doc(userid).collection('family').doc(profid)
        .update({imgfile: this.imgfile})
        }
      }


   },

   created() {
     this.fetchItems()
   },

   //Register Locally
  components:{
    'app-header':Header,
    'UploadProPics':UploadProPics,
    //'app-footer':Footer
    
  }

}
</script>

<style scoped>
html, body {
  display: -moz-grid-line;
  align-items: center;
  justify-content: center;
  /*flex-direction: column;*/
  margin-top: 16px;
  margin-bottom: 16px;
}

.wrapper {
  display: flex;
  max-width:100%;
  flex-wrap:wrap;
  padding-top:12px;
  align-items:center;
  justify-content:center;
}

@keyframes animated-border {
  0% {
    box-shadow: 0 0 0 0 rgba(0,0,0,0.4);
  }
  100% {
     box-shadow: 0 0 0 20px rgba(0,0,0,0);
  }
}

.card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    max-width: 100%;
    margin: 12px;
    transition: .15s all ease-in-out;
    padding: 10px;
    border-radius:40%;
    border: 4px solid;
    font-family: Impact, fantasy;
    color: #b294eb;
    
}

.active {
    animation: animated-border 1.5s infinite;

}

img {
  height:100px;
  width:150px;
  border-radius:40px;
}

a {
    text-decoration: none;
      padding: 12px;
      color: black;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
}

.btn {
  font-family: Impact, fantasy;
  background-color:#b294eb;
  color:white;
  border-radius:10px;
  position: relative;
  margin:5px 5px;
  text-align: center;
}

#confirmButton {
  text-align: center;
  font-size: 24px;
  height:50px;
  width:100px;
  margin-right: 30px;
}

#edit {
  display:none;
}

.hide {
  display: none;
  font-size: 15px;
  color:rgb(204, 196, 196);
  font:"Helvetica";
}
    
.card:hover .hide {
  display: block;
}

#welcome {
  font-family: Chalkduster, fantasy;
  font-size: 25px;
  color:#555
}
</style>
