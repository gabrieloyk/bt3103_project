<template>
   <div>
    <header>
        <h1>{{ msg }}</h1>
        <router-link to="/home">Home</router-link>
        <router-link to="/reports">Reports</router-link> 
        <router-link to="/family">Family</router-link>
        <button id="logout" @click="logout">Sign Out</button> 
        <router-link to="/search"> Search... </router-link>
    </header>
    </div>
  
</template>

<script>
import firebase from 'firebase';

export default {
  data(){
    return{
        msg: 'Expired?'
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
    background:#ffd300;
    border-style: solid;
    border-color:black;
    border-width: 2px;
    height: 120px;
    text-align: top;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
h1{
    color:rgb(122, 63, 100)
}
a{
    color: rgb(122, 63, 100);
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
.router-link-active{
    background: #eee;
    color: #444;
}
.logout {
    background: #eee;
    color: #444;

}
</style>