import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../main'

import * as cocoSSD from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs';
Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    // data
    state: {
        notes: [],
        brightness: true,

        imgPath: "",
        model: {},

        isLogin: false,
        uid: "",
        email: ""
    },

    // computed
    getters: {
        getBrightness: state => {
            return state.brightness;
        },
        getWeather: state => {
            return state.weather;
        },

        getModel: state => {
            return state.model;
        },

        getIsLogin: state => {
            return state.isLogin;
        },
        getUid: state => {
            return state.uid;
        }

    },

    // methods
    // 실제 값을 변경할 때(비동기X)
    mutations: {

        setBrightness: (state, color) => {
            let hexR = color.substring(1, 3);
            let hexG = color.substring(3, 5);
            let hexB = color.substring(5, 7);
            // 자료형 변환
            let decR = parseInt(hexR, 16);
            let decG = parseInt(hexG, 16);
            let decB = parseInt(hexB, 16);
            // 명도 계산
            let v = (decR + decG + decB) / 3;

            //threshold
            (v < 120) ? state.brightness = false : state.brightness = true;
        },

        changeImage: (state, path) => {
            console.log(state);
            console.log(path);
        },

        initModel: async (state, model) => {
            state.model = model;
            console.log("model loaded");
        },


    },

    // methods
    // 일반 로직(비동기O)
    actions: {

        loginCheck (context) {
            return new Promise(function (resolve) {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        context.state.email = user.email;
                        context.state.isLogin = true
                        context.state.uid = user.uid
                        console.log(context.state.uid)
                        resolve("complete")

                    } else {
                        context.state.isLogin = false
                    }
                });
            })

        },


        loadModel: async (context) => {
            let model;
            model = tf.sequential();
            model = await cocoSSD.load(); //cocoSSD라는 detection model을 로딩 동기식으로 
            context.commit('initModel', model)
        },

        googleLogin: (state) => {


            var provider = new firebase.auth.GoogleAuthProvider();

            // 로그인 아이디의 기본값을 지정합니다. 지정하지 않아도 됩니다.
            provider.setCustomParameters({
                login_hint: "user@example.com",
                // 계정 지정 옵션
                prompt: 'select_account'
            });

            // 로그인 팝업창을 띄웁니다.
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // ...
                    console.log(user.uid);
                    state.uid = user.uid;
                    // _this.$router.push("/profile");
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });

        },

        googleLogout: (context) => {
            firebase.auth().signOut().then(function () {
                alert("로그아웃 되셨습니다.")
                context.state.isLogin = false
                context.state.uid = ""
            }).catch(function (error) {
                alert("ERROR")
            });
        },

    }
})