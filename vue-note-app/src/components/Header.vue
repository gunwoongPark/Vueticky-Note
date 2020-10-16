<template>
<div class="header">
    <img src="../assets/50Vemo.png" />
    <p>Vemo</p>
    <SearchBar />
    <v-spacer></v-spacer>
    <p>{{ this.date }}</p>
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

    components: {
        SearchBar
    }
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
