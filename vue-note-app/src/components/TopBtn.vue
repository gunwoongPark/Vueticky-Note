<template>
<div>
    <v-btn class="topBtn mx-2" @click="goTop" fab dark color="blue">
        <v-icon>mdi-arrow-up-thick</v-icon>
    </v-btn>
</div>
</template>

<script>
export default {
    methods: {
        goTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        }
    }
}
</script>

<style scoped>
.topBtn {
    position: fixed;
    right: 10%;
    bottom: 5%;
    z-index: 10;
}
</style>
