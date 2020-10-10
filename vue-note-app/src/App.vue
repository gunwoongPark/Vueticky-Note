<template>
<v-app>
    <v-main>
        <Header style="z-index: 10" />

        <CalendarBtn />

        <WriteBtn @noteAdded="newNote" />

        <div class="noteContainer">
            <v-row v-masonry item-selector=".noteList">
                <v-col class="noteList" v-for="(note, index) in notes" :key="`note-${index}`" v-masonry-tile cols="12" lg="2" md="3" sm="6">
                    <Card :index="index" :note="note" @modifyNote="modifyNote" @deleteNote="deleteNote" />
                </v-col>
            </v-row>
        </div>
    </v-main>
</v-app>
</template>

<script>
import Header from "./components/Header";
import WriteBtn from "./components/WriteBtn";
import CalendarBtn from "./components/CalendarBtn"
import Card from "./components/Card"

export default {
    components: {
        Header,
        WriteBtn,
        CalendarBtn,
        Card
    },

    data() {
        return {
            notes: [],
            mouseHover: false,
        };
    },

    mounted() {
        if (localStorage.getItem("notes"))
            this.notes = JSON.parse(localStorage.getItem("notes"));
    },

    watch: {
        notes: {
            handler() {
                var newNotes = this.notes;
                localStorage.setItem("notes", JSON.stringify(newNotes));
            },
            deep: true,
        },
    },

    methods: {
        newNote(title, text, theme, time) {
            this.notes.push({
                title: title,
                text: text,
                theme: theme,
                time: time
            });
        },

        modifyNote(notes) {
            this.notes = notes;
        },

        deleteNote(notes) {
            this.notes = notes;
        }

    },
};
</script>

<style scoped>
.calendarBtn {
    position: fixed;
    right: 5%;
    bottom: 15%;
}

.noteContainer {
    margin-top: 100px;
    margin-left: 25px;
    margin-right: 25px;
}
</style>
