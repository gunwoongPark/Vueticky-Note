<template>
  <div>
    <!-- 글을 입력할 때 마다 검색을 활성화 하기위해 @input 사용 -->
    <!-- PC 뷰 -->
    <v-text-field
      color="teal"
      class="searchBar hidden-sm-and-down"
      outlined
      label="Type a note to find..."
      append-icon="mdi-magnify"
      v-model="text"
      hide-details
      type="text"
      @input="submitText"
    ></v-text-field>

    <!-- 모바일 뷰 -->
    <v-text-field
      dense
      color="teal"
      class="searchBar hidden-md-and-up"
      outlined
      label="Type a note to find..."
      append-icon="mdi-magnify"
      v-model="text"
      hide-details
      type="text"
      @input="submitText"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },

  methods: {
    submitText() {
      this.$emit("submitText", this.text);
    },
  },
};
</script>

<style scoped>
.searchBar {
  margin-right: 15px;
  background: white;
}
</style>
