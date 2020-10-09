<template>
<div>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mx-2 plusBtn" fab dark color="black" style="z-index: 10">
                <v-icon dark> mdi-plus </v-icon>
            </v-btn>
        </template>
        <Editor :notes="notes" @noteAdded="newNote" />
    </v-dialog>
</div>
</template>

<script>
import Editor from "./Editor";
export default {
    data() {
        return {
            notes: {
                title: "",
                text: "",
                theme: "",
            },

            dialog: false,
        };
    },

    methods: {
        newNote(title, text, theme) {
            this.dialog = false;
            this.$emit("noteAdded", title, text, theme);
        },
    },

    components: {
        Editor,
    },
};
</script>

<style scoped>
.plusBtn {
    position: fixed;
    right: 5%;
    bottom: 5%;
}
</style>
