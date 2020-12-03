import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase"

import * as cocoSSD from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs';
Vue.use(Vuex)

export default new Vuex.Store({

    // data
    state: {
        isDark: false,
        brightness: true,

        imgPath: "",
        model: {},

        isLogin: false
    },

    // computed
    getters: {
        getDark: state => {
            return state.isDark;
        },
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
        }

    },

    // methods
    // 실제 값을 변경할 때(비동기X)
    mutations: {
        // 모드 변경 -> 변수 변경, 로컬 스토리지에 반영
        changeMode: (state) => {
            state.isDark = !state.isDark;

            var newMode = state.isDark;
            localStorage.setItem("isDark", JSON.stringify(newMode));
        },



        initMode: (state) => {
            if (localStorage.getItem("isDark")) {
                if (JSON.parse(localStorage.getItem("isDark")))
                    state.isDark = true;
                else
                    state.isDark = false;
            }
            else {
                var newMode = false;
                localStorage.setItem("isDark", JSON.stringify(newMode));
            }
        },
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

        loginCheck: (state) => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    state.isLogin = true
                    console.log("login!");
                } else {
                    state.isLogin = false
                    console.log("no login!");
                }
            });
        }

    },

    // methods
    // 일반 로직(비동기O)
    actions: {
        loadModel: async (context) => {
            let model;
            model = tf.sequential();
            model = await cocoSSD.load(); //cocoSSD라는 detection model을 로딩 동기식으로 
            context.commit('initModel', model)
        },

        googleLogin: () => {
            var provider = new firebase.auth.GoogleAuthProvider();

            // 로그인 아이디의 기본값을 지정합니다. 지정하지 않아도 됩니다.
            provider.setCustomParameters({
                login_hint: "user@example.com",
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
            }).catch(function (error) {
                alert("ERROR")
            });
        }

    }
})