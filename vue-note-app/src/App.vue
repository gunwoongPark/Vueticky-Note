<template>
<v-app>
    <v-main>
        <Header style="z-index: 10" />

        <CalendarBtn />

        <WriteBtn @noteAdded="newNote" />

        <div class="noteContainer">
            <v-row v-masonry item-selector=".noteList">
                <v-col class="noteList" v-for="(note, index) in notes" :key="`note-${index}`" v-masonry-tile cols="12" lg="2" md="3" sm="6">
                    <v-card @mouseenter="mouseEnter" @mouseleave="mouseLeave" class="note" :style="{ 'background-color': note.theme }">
                        <v-card-title>{{ note.title }}</v-card-title>
                        <v-card-text>{{ note.text }}</v-card-text>

                        <div class="footerContainer">
                            <div class="time">{{note.time}}</div>
                            <v-spacer></v-spacer>

                            <div class="iconContainer">
                                <ModifyBtn :index="index" @noteModified="modifyNote" />

                                <v-icon class="deleteIcon" @click.prevent="deleteNote(index)">mdi-delete</v-icon>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-main>
</v-app>
</template>

<script>
import Header from "./components/Header";
import WriteBtn from "./components/WriteBtn";
import ModifyBtn from "./components/ModifyBtn";
import CalendarBtn from "./components/CalendarBtn"

export default {
    components: {
        Header,
        WriteBtn,
        ModifyBtn,
        CalendarBtn
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
        modifyNote(title, text, theme, index, time) {
            console.log(title, text, theme, index);
            this.notes = JSON.parse(localStorage.getItem("notes"));
            this.notes[index].title = title;
            this.notes[index].text = text;
            this.notes[index].theme = theme;
            this.notes[index].time = time;
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
        },
        mouseEnter(e) {
            e.target.lastChild.lastChild.style.display = "flex";
        },
        mouseLeave(e) {
            e.target.lastChild.lastChild.style.display = "none";
        },
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

.deleteIcon:hover {
    cursor: pointer;
}

.modifyIcon:hover {
    cursor: pointer;
}

.footerContainer {
    display: flex;
}

.time {
    place-self: center;
    margin-left: 3%;
}

.iconContainer {
    display: none;
}
</style>
