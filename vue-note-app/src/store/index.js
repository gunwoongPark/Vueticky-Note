import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({

    // data
    state: {
        isDark: false,
        brightness: true,

        lat: "",
        lon: "",

        apiURL: "http://api.openweathermap.org/data/2.5/weather",

        appid: "7ae860771f4eef0020863071b271395c",

        weather: {},
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

        getWeather: (state) => {
            window.navigator.geolocation.getCurrentPosition(position => {
                state.lat = String(position.coords.latitude);
                state.lon = String(position.coords.longitude);
                axios
                    .get(`${state.apiURL}?lat=${state.lat}&lon=${state.lon}&appid=${state.appid}&units=metric`
                    )
                    .then((res) => {
                        console.log(res.data);
                        state.weather.temperature = res.data.main.temp;
                        state.weather.skycode = res.data.weather[0].id;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
        },
    },

    // methods
    // 일반 로직(비동기O)
    actions: {

    }
})