import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
    user: {
        username: '',
      }
 },
 plugins: [createPersistedState()],
 getters: {},
 mutations: {
    chooseUser(state, payload) {
        state.user.username = payload
    }
 },
 actions: {}
});