<template>
    <body>
    <div class='div1'>
        <img src="https://images.theconversation.com/files/282104/original/file-20190701-105182-1q7a7ji.jpg" >
        <div id="content">
            <router-link to="/" style="color:white">Log In</router-link> |
            <router-link to="/register" style="color:white">Register</router-link> 
            <form @submit.prevent="login" id="form1">
                <h1>Welcome to "Expired?"!</h1>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email address..."
                    v-model="email"
                /><br><br>
                <input
                    type="password"
                    placeholder="password..."
                    v-model="password"
                />
                <p v-on:click="forgot()" style="font-style:italic;color:#bd9bda"> Forgot Password?</p>
                <button type="submit">Login</button>
                <br><br>
            </form>
        </div>
    </div>
    </body>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'LogInPage',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
      
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    if(firebase.auth().currentUser.emailVerified) {
                        alert('Successfully logged in');
                        this.$router.push('/users');
                    } else {
                        alert("Please verify in your email!")
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        forgot() {
            this.$router.push('/forgot-password')
        }
    }
};
</script>

<style scoped>
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
    form {
        padding-top: 5px;
        padding-bottom: 30px;
        background-color: floralwhite;
    }
    #content{
        margin-top: 10%;
        float:right;
        width:50%;
        background-color:#bd9bda;
    }
    input {
        padding : 10px;
        border-radius: 5em;
        border-color: rgb(197, 141, 141);
    }
    h1 {
        color: #9C27B0;
    }
    .div1 {
        background-color:#bd9bda;
        height:100vh;
        padding: 0;
        margin: 0;
        width: 100%;
        min-height: 100%;
    }
    router-link {
        float:right;
    }
    img {
        width:50%;
        height:100%;
    }
</style>
