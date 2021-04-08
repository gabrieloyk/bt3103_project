import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
    user: {
        username: '',
      }
 },
 getters: {},
 mutations: {
    chooseUser(state, payload) {
        state.user.username = payload
    }
 },
 actions: {}
});