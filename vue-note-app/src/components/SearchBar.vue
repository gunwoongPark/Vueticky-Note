<template>
  <div>
    <v-text-field
      class="searchBar"
      placeholder="Type note..."
      hide-details
      prepend-icon="mdi-magnify"
      single-line
      v-model="text"
      type="text"
      @input="submitText"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ""
    }
  },

  methods: {
    submitText () {
      this.$emit("submitText", this.text);
    },

  }
}
</script>

<style scoped>
.searchBar {
  margin-right: 15px;
}
</style>
