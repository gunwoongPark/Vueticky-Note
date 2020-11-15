<template>
<div>
    <v-btn rounded class="changeBtn" @click="changeMode">Change Mode</v-btn>
</div>
</template>

<script>
export default {
    methods: {
        changeMode() {
            this.$emit("changeMode");
        },
    },
};
</script>

<style scoped>
.changeBtn {
    left: 5%;
    position: fixed;
    bottom: 5%;
    z-index: 10;
}
</style>
