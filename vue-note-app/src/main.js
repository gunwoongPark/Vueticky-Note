import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/vue-masonry'
import store from './store'
import firebase from "firebase"

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyAq0BG8AiWQsKI4YHvmclK5E0qz3_6HuaE",
  authDomain: "vueticky-note.firebaseapp.com",
  projectId: "vueticky-note",
  storageBucket: "vueticky-note.appspot.com",
  messagingSenderId: "111551127882",
  appId: "1:111551127882:web:4036debab553ed398321b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
