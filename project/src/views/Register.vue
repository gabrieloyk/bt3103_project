<template>
    <body>
    <div>
        <router-link to="/" style="color:white">Log In</router-link> |
        <router-link to="/register" style="color:white">Register</router-link> 
            <!--<router-link to="/dashboard">Dashboard</router-link> |-->
        <form @submit.prevent="register">
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            /><br><br>
            <input
                type="password"
                placeholder="password..."
                v-model="password"
            /><br><br>
            <button type="submit">Register</button>
        </form>
    </div>
    </body>
</template>
<script>
import firebase from 'firebase';

export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => { /*add the user to user collections in firestore*/
                    const user = firebase.auth().currentUser
                    const actionCodeSettings = {
                        url:`https://bt3103-676e0.web.app/`,
                        handleCodeInApp:true,
                    }
                    alert("Please check your email for verification!")
                    user.sendEmailVerification(actionCodeSettings);
                    //alert('Successfully registered! Please login.');
                    //this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
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
    form {
        padding-top: 5px;
        padding-bottom: 30px;
        background-color: floralwhite;
    }
    input {
        padding : 10px;
        border-radius: 5em;
        border-color: rgb(197, 141, 141);
    }
</style>

