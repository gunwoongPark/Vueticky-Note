<template>
<div>
    <v-card>
        <v-card-title class="headline grey lighten-2">
            <textarea v-model="title" cols="60" placeholder="Title"></textarea>
        </v-card-title>

        <v-card-text>
            <textarea v-model="text" placeholder="Take a note..." cols="60" rows="20"></textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="createNew"> register </v-btn>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            theme: "",
            text: "",
        };
    },

    methods: {
        createNew() {
            this.$emit("noteAdded", this.title, this.text, this.theme);
            this.title = "";
            this.text = "";
            this.theme = "";
        },
    },
};
</script>

<style scoped>
textarea {
    padding: 10px;
    resize: none;
    border: none;
}

textarea:hover {
    outline: 0;
}

textarea:focus {
    outline: 0;
}
</style>
