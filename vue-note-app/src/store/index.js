import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    // data
    state: {
        brightness: true
    },

    // computed
    getters: {
        getBrightness: state => {
            return state.brightness;
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
            //console.log(v);

            //threshold 
            (v < 120) ? state.brightness = false : state.brightness = true;
        }
    },

    // methods
    // 일반 로직(비동기O)
    actions: {

    }
})