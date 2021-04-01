<template>
    <div>
        <router-link to="/">Log In</router-link> |
        <router-link to="/register">Register</router-link> 
            <!--<router-link to="/dashboard">Dashboard</router-link> |-->
        <form @submit.prevent="register">
            <h2>Register</h2>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <button type="submit">Register</button>
        </form>
    </div>
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
                .then((cred) => { /*add the user to user collections in firestore*/
                    firebase.firestore().collection('users').doc(cred.user.uid).set({
                        email:this.email,
                        password:this.password
                    })
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
