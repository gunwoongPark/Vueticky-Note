import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({

    // data
    state: {
        isDark: false,
        brightness: true,
        weather: {},

        apiURL: "http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst",

        serviceKey: "kVRhALvyxzc27lUT2I4LpbKLcvVd%2BMdsRERuwd7IkOqzJk6n48dz9rIFMrdNh%2B83AJw2O5o1Z3%2FX4AjvCrz%2B6g%3D%3D",

        ServerURL: "http://localhost:3000",
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

        getWeather: (state, payload) => {
            // 날씨 정보 받아오기
            axios
                .get(
                    `${state.apiURL}?serviceKey=${state.serviceKey}&dataType=JSON&base_date=${payload.base_date}&base_time=${payload.base_time}&nx=60&ny=127`
                )
                .then((res) => {
                    let PTY = res.data.response.body.items.item.filter(
                        (el) => el.category === "PTY"
                    );

                    let T1H = res.data.response.body.items.item.filter(
                        (el) => el.category === "T1H"
                    );

                    state.weather.PTY = PTY;
                    state.weather.T1H = T1H;
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        imgUpload: (state, form) => {
            //console.log(form);
            axios.post(`${state.ServerURL}/imageUpload`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => {
                    console.log(res.status);
                })
                .catch((err) => {
                    console.log(err.res);
                })
        },
        // getImg: (state, guid) => {
        //     //console.log(guid);
        //     axios.get(`${state.ServerURL}/image/${guid}`)
        //         .then((res) => {
        //             //console.log(res.data.image.imgName);
        //             state.imgName = res.data.image.imgName
        //         })
        //         .catch((err) => {
        //             console.log(err.res);
        //         })
        // },
    },

    // methods
    // 일반 로직(비동기O)
    actions: {

    }
})