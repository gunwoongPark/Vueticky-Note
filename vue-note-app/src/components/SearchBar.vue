<template>
<div>
    <input type="text" class="form-control form-control-lg" placeholder="Type memo..." v-model="text" @input="submitText">
</div>
</template>

<script>
export default {
    data() {
        return {
            text: ""
        }
    },

    methods: {
        submitText() {
            this.$emit("submitText", this.text);
        },

    }
}
</script>

<style scoped>
</style>
