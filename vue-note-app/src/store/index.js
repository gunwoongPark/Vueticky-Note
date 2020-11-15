import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    // data
    state: {
        isDark: false
    },

    // computed
    getters: {
        getDark: state => {
            return state.isDark;
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
        }
    },

    // methods
    // 일반 로직(비동기O)
    actions: {

    }
})