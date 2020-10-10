<template>
<div>
    <v-card :style="{ 'background-color': note.theme }">
        <v-card-title class="headline lighten-2">
            {{note.title}}
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
            {{note.text}}
        </v-card-text>

    </v-card>
</div>
</template>

<script>
export default {
    props: {
        note: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>

</style>
