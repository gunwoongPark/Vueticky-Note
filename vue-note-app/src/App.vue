<template>
<v-app>
    <v-main>
        <Header style="z-index: 10" :date="date" @searchNote="searchNote" />

        <CalendarBtn @selectDate="selectDate" />

        <WriteBtn @noteAdded="newNote" :date="date" />

        <div class="noteContainer">
            <v-row v-masonry item-selector=".noteList">
                <v-col class="noteList" v-for="(note, index) in todayNotes" :key="`note-${index}`" v-masonry-tile cols="12" lg="2" md="3" sm="6">
                    <Card :note="note" :date="date" @modifyNote="modifyNote" @deleteNote="deleteNote" />
                </v-col>
            </v-row>
        </div>
    </v-main>
</v-app>
</template>

<script>
import Header from "./components/Header";
import WriteBtn from "./components/WriteBtn";
import CalendarBtn from "./components/CalendarBtn";
import Card from "./components/Card";

export default {
    components: {
        Header,
        WriteBtn,
        CalendarBtn,
        Card,
    },

    data() {
        return {
            notes: [],
            todayNotes: [],
            mouseHover: false,
            date: "",
        };
    },

    mounted() {
        const dateObj = new Date();
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        this.date = `${year}-${month}-${day}`;

        if (localStorage.getItem("notes"))
            this.notes = JSON.parse(localStorage.getItem("notes"));
    },

    watch: {
        notes: {
            handler() {
                var newNotes = this.notes;
                localStorage.setItem("notes", JSON.stringify(newNotes));
                this.todayNotes = this.notes.filter((note) => note.date === this.date);
            },
        },

        date: {
            handler() {
                this.todayNotes = this.notes.filter((note) => note.date === this.date);
            },
            deep: true,
        },

    },

    methods: {
        newNote(title, text, theme, time, date, guid) {
            this.notes.push({
                title: title,
                text: text,
                theme: theme,
                time: time,
                date: date,
                guid: guid,
            });
        },

        modifyNote(title, text, theme, time, date, guid) {
            const index = this.notes.findIndex((note) => note.guid === guid);

            let tempObj = {};
            tempObj.title = title;
            tempObj.text = text;
            tempObj.theme = theme;
            tempObj.time = `edit ${date} ${time}`;
            tempObj.guid = guid;
            tempObj.date = this.date;

            this.notes.splice(index, 1);
            this.notes.splice(index, 0, tempObj);
        },

        deleteNote(guid) {
            const index = this.notes.findIndex((note) => note.guid === guid);

            this.notes.splice(index, 1);
        },

        selectDate(picker) {
            if (this.date !== picker) this.date = picker;
        },

        searchNote(memo) {
            let notes = JSON.parse(localStorage.getItem("notes"));
            if (memo === "")
                this.todayNotes = notes.filter(note => note.date === this.date);
            else {
                let todayNotes = notes.filter(note => note.date === this.date);

                this.todayNotes = todayNotes.filter(note => note.title.includes(memo) || note.text.includes(memo));

            }
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

    height: 10000px;
}
</style>
