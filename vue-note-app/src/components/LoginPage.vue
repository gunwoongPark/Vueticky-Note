<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Login</h1>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col>
        <GoogleLogin v-if="!isLogin" />

        <GoogleLogout v-else />
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col>
        <h1>Hello</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GoogleLogin from "./GoogleLogin";
import GoogleLogout from "./GoogleLogout";

export default {
  name: "LoginForm",
  data () {
    return {

    };
  },
  methods: {

  },
  computed: {
    isLogin () {
      return this.$store.getters.getIsLogin;
    },
  },
  components: {

    GoogleLogin,
    GoogleLogout,
  },
};
</script>
<style scoped>
#logo {
  width: 200px;
  height: auto;
}
</style>