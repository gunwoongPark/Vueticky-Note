<template >
  <v-main id="main">
    <v-container id="container">
      <v-row id="inContainer" class="text-center">
        <v-col>
          <h1 style="color: teal">Vueticky Note</h1>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <h1>Login</h1>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col>
          <GoogleLogin v-if="!isLogin" />
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <v-btn @click="removeBack">Hello</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row id="footrow" class="text-center">
      <v-footer id="customFooter" absolute style="height: 25px">
        <v-col cols="12">
          <v-row class="justify-center">
            <v-col cols="12" sm="6" md="4" lg="4" xl="3">
              <h4>문의 : 16.박건웅/16.황윤성</h4>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4" xl="3">
              <h4>찾아오는 길 : DK_B_207</h4>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="4" xl="3">
              <h4>소속 : 금오공과대학교 컴퓨터공학과</h4>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="text-center" cols="12">
          <h4 id="footerCopyright">&copy; Copyright OSP20_10</h4>
        </v-col>
      </v-footer>
    </v-row>
  </v-main>
</template>
<script>
import GoogleLogin from "./GoogleLogin";


export default {
  name: "LoginForm",
  data () {
    return {


    };
  },

  methods: {
    removeBack () {
      var test = document.getElementById('main');
      test.removeAttribute("id");
      console.log(test);
    }

  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsLogin;
    },
  },
  components: {

    GoogleLogin,

  },
};



</script>

<style scoped>
#empty {
  background-color: teal;
}
#main {
  background-image: url(../assets/l.png);
}
#container {
  width: 400px;
  height: 600px;
  background-image: url(../assets/loginimg.png);
  margin-top: 70px;
}
#inContainer {
  margin-top: 90px;
}
#logo {
  width: 200px;
  height: auto;
}
#footrow {
  margin-top: 50px;
}
#customFooter {
  border-top: 2px solid teal;
  background: white;
}

#footerCopyright {
  color: gray;
}

h4 {
  color: teal;
}
</style>