<template>
  <div class="header">
    <img src="../assets/Vemo.png" />
    <p>Vemo</p>
    <v-spacer></v-spacer>
    <p>{{ this.date }}</p>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: #fff;
  margin-bottom: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
img {
  margin-left: 20px;
}
p {
  font-size: 25px;
  margin: 25px;
  margin-left: 10px;
}
</style>
