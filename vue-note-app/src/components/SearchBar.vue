<template>
  <div>
    <!-- 글을 입력할 때 마다 검색을 활성화 하기위해 @input 사용 -->
    <v-text-field
      color="teal"
      class="searchBar"
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
  props: {
    isDark: {
      type: Boolean,
      required: true,
    },
  },

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
