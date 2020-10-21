<template>
<div>
    <v-dialog v-model="dialog" width="550">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="mx-2 plusBtn" fab dark color="blue" style="z-index: 10" @click="initData">
                <v-icon dark> mdi-plus </v-icon>
            </v-btn>
        </template>
        <WriteEditor :date="date" :note="note" @noteAdded="newNote" />
    </v-dialog>
</div>
</template>

<script>
import cryptoRandomString from "crypto-random-string";
import WriteEditor from "./WriteEditor";
export default {
    props: {
        date: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            note: {
                title: "",
                text: "",
                theme: "#FFFFFFFF",
            },

            dialog: false,
        };
    },

    methods: {
        initData() {
            this.note.title = "";
            this.note.text = "";
            this.note.theme = "rgb(240,240,240)";
        },

        newNote(title, text, theme, time, date, isImportant, tags) {
            this.dialog = false;
            this.$emit(
                "noteAdded",
                title,
                text,
                theme,
                time,
                date,
                cryptoRandomString({
                    length: 10
                }),
                isImportant,
                tags
            );
        },
    },

    components: {
        WriteEditor,
    },
};
</script>

<style scoped>
.plusBtn {
    position: fixed;
    right: 5%;
    bottom: 15%;
    z-index: 10;
}
</style>
