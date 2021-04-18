<template>
    <body>
    <div class='div1'>
        <img src="https://images.theconversation.com/files/282104/original/file-20190701-105182-1q7a7ji.jpg" >
        <div id="content">
        <form @submit.prevent="register">
            <h1>Welcome to "Expired?"!</h1>
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email address"
                v-model="email"
            /><br><br>
            <input
                type="password"
                placeholder="Password"
                v-model="password"
            /><br><br>
            <button type="submit">Register</button><br><br>
            <hr width="50%">
            <p v-on:click="signInRoute()" style="font-style:italic;color:#bd9bda;font-size:12px">Already have an account? Sign in here</p>
        </form>
        </div>
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
        signInRoute() {
            this.$router.push('/')
        }
    },
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
        background-color: whitesmoke;
    }
    #content{
        margin-top: 10%;
        float:right;
        width:35%;
        background-color:whitesmoke;
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
        background-color:whitesmoke;
        height:100vh;
        padding: 0;
        margin: 0;
        width: 100%;
        min-height: 100%;
        box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
		0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    }
    img {
        width:65%;
        height:100%;
        box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
		0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    }
    .router {
        border: rgba(99, 102, 241);
        border-radius: 0.375rem;
        list-style-type: none;
    }
</style>

