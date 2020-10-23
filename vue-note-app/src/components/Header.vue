<template>
  <div class="header">
    <v-container fluid>
      <div class="PCView hidden-sm-and-down">
        <v-row style="align-items: center">
          <v-col><img src="../assets/50VemoBlue.png" /></v-col>
          <v-col>
            <p>{{ this.date }}</p>
          </v-col>
          <v-col>
            <SearchBar @submitText="submitText" />
          </v-col>
        </v-row>
      </div>

      <div class="mobileView hidden-md-and-up">
        <v-row style="align-items: center">
          <v-col cols="1"><img src="../assets/50VemoBlue.png" /></v-col>
          <v-col cols="11" style="text-align: center">
            <p>{{ this.date }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <SearchBar @submitText="submitText" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },

  methods: {
    submitText(text) {
      this.$emit("searchNote", text);
    },
  },

  components: {
    SearchBar,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  background: rgba(255, 255, 255, 0.741);
  color: #2196f3;
  position: fixed;
  left: 0;
  right: 0;
}

p {
  font-size: 25px;
  margin: 25px;
  margin-left: 11%;
  font-family: "Sansita Swashed", cursive;
}
</style>
