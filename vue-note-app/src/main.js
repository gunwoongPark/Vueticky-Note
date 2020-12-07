import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/vue-masonry'
import store from './store'
import firebase from "firebase"
import 'firebase/firestore'
// import router from "./router"


Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDaHOirBYZTLYHqt5iSRdyfEX7Gs1KRyiM",
  authDomain: "vueticky-note-b08f1.firebaseapp.com",
  projectId: "vueticky-note-b08f1",
  storageBucket: "vueticky-note-b08f1.appspot.com",
  messagingSenderId: "660375676123",
  appId: "1:660375676123:web:8e65be5427d02890bd18fe"
};
// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }


new Vue({
  // router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
