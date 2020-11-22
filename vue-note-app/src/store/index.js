import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import ipObj from "../ip.js"
Vue.use(Vuex)

export default new Vuex.Store({

    // data
    state: {
        isDark: false,
        brightness: true,


        ServerURL: ipObj.ip,
        imgName: ""

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
        getImgName: state => {
            return state.imgName;
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
            //console.log(v);

            //threshold
            (v < 120) ? state.brightness = false : state.brightness = true;
        },



        imgUpload: (state, form) => {

            axios.post(`${state.ServerURL}/imageUpload`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    console.log(res.status + ":Success ImageUploading");
                })
                .catch((err) => {
                    console.log(err.res);
                })
        },
        imgModify: (state, form) => {

            axios.put(`${state.ServerURL}/imageModify`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    console.log(res.status + ":Success ImageModify");
                    //console.log(res.data.imgName);
                    state.imgName = res.data.imgName;
                    //console.log(state.imgName)
                })
                .catch((err) => {
                    console.log(err.res);
                })
        },

    },

    // methods
    // 일반 로직(비동기O)
    actions: {

    }
})