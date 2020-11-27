import Vue from 'vue'
import Vuex from 'vuex'
//import axios from "axios"

import * as cocoSSD from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs';
Vue.use(Vuex)

export default new Vuex.Store({

    // data
    state: {
        isDark: false,
        brightness: true,


        // ServerURL: "http://192.168.35.17:3000",
        // imgName: "",

        imgPath: "",
        model: {},
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


        }
        // getImgName: state => {
        //     return state.imgName;
        // },

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

        changeImage: (state, path) => {
            console.log(state);
            console.log(path);
        },

        initModel: async (state, model) => {
            state.model = model;
            console.log("model loaded");
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
        }

    }
})