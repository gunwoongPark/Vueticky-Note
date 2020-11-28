import firebase from 'firebase/app'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyAiXkwtYAopHEOozm36Z1nE-2MJVLJFSrc",
    authDomain: "osp2020-aede8.firebaseapp.com",
    databaseURL: "https://osp2020-aede8.firebaseio.com",
    projectId: "osp2020-aede8",
    storageBucket: "osp2020-aede8.appspot.com",
    messagingSenderId: "444506716014",
    appId: "1:444506716014:web:1ece3c51efb08278c7f37f"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

export const db = firebase.initializeApp(firebaseConfig).firestore();

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }