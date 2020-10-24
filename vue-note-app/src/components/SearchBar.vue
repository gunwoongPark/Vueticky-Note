<template>
  <div>
    <v-text-field
      v-model="text"
      type="text"
      label="Search note"
      outlined
      color="#00bfa5"
      append-icon="mdi-magnify"
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
</style>
