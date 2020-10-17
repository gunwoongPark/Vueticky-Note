<template>
  <div class="header">
    <img src="../assets/50VemoBlue.png" />
    <v-spacer></v-spacer>
    <p>Now Date is {{ this.date }}</p>
    <v-spacer></v-spacer>
    <SearchBar @submitText="submitText" />
  </div>
</template>

<script>
import SearchBar from './SearchBar'
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },

  methods: {
    submitText (text) {
      this.$emit("searchNote", text);
    }
  },

  components: {
    SearchBar
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.741);
  color: #2196f3;
  position: fixed;
  left: 0;
  right: 0;
}

img {
  margin-left: 20px;
}

p {
  font-size: 25px;
  margin: 25px;
  margin-left: 11%;
  font-family: "Sansita Swashed", cursive;
}
</style>
