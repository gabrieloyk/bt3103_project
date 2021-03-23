<template>
    <div>
        <router-link to="/">Log In</router-link> |
        <router-link to="/register">Register</router-link> 
            <!--<router-link to="/dashboard">Dashboard</router-link> |-->
        <form @submit.prevent="login">
            <h2>Login</h2>
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
            <button type="submit">Login</button>
        </form>
    </div>
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
                    alert('Successfully logged in');
                    this.$router.push('/home');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
