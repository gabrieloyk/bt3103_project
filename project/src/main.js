import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router';
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyAi1vPks9QTuL_2k-BzqqVqYl7BQZD2KBs",
  authDomain: "bt3103-676e0.firebaseapp.com",
  projectId: "bt3103-676e0",
  storageBucket: "bt3103-676e0.appspot.com",
  messagingSenderId: "327036820951",
  appId: "1:327036820951:web:fa6adbaf908c01bfc8ff92",
  measurementId: "G-RTC7LP5C1N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
