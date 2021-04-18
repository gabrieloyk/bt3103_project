<template>
   <div>
    <header>
        <!--<h1>{{ msg }}</h1>-->
        <p><img :src="logo"/></p>
        <router-link to="/aboutus"> About Us </router-link>
        <router-link to="/home">Home</router-link>
        <router-link to="/reports">Reports</router-link> 
        <router-link to="/family">Family</router-link>
        <router-link to="/search"> Search... </router-link>
        <button id="button" @click="logout">Sign Out</button> 
    </header>
    </div>
  
</template>

<script>
import firebase from 'firebase';
import logo from '../assets/Expired_.png';

export default {
  data(){
    return{
        //msg: 'Expired?'
        logo: logo
        }
  },
  methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    alert('Successfully logged out');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header{
    background: rgb(253, 235, 203);
    border-style: solid;
    border-color: #b294eb;
    border-width: 7px;
    height: 230px;
    text-align: top;
    font-family: Impact, fantasy;
}
h1{
    color:rgb(122, 63, 100);
    font-size: 50px;
}
a{
    color: rgb(137, 99, 172);
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active{
    background: rgb(255, 255, 255);
    color: rgb(218, 87, 87);
}
.logout {
    background: #eee;
    color: #444;

}
#button {
    border-color: transparent;
    font-family: Impact, fantasy;
    font-size: 18px;
    color: white;
    background: rgb(184, 150, 169);
    border-radius: 10px;
}
</style>