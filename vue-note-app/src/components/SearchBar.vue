<template>
<div>
    <input type="text" class="form-control form-control-lg bar" placeholder="Type note..." v-model="text" @input="submitText">
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
