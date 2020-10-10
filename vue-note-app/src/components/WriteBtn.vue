<template>
<div>
    <v-dialog v-model="dialog" width="1000">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mx-2 plusBtn" fab dark color="black" style="z-index: 10" @click="initData">
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
                theme: "#FFFFFFFF",
            },

            dialog: false,
        };
    },

    methods: {
        initData() {
            this.notes.title = "";
            this.notes.text = "";
            this.notes.theme = "#FFFFFFFF";
        },
        newNote(title, text, theme, time) {
            this.dialog = false;
            this.$emit("noteAdded", title, text, theme, time);
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
