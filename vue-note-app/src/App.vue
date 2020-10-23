<template>
<v-app>
    <v-main>

        <Header style="z-index: 10" :date="date" @searchNote="searchNote" />

        <div v-if="btnsToggle" class="btnContainer">
            <v-btn v-if="isTagMode" class="mx-2 reloadBtn" fab dark color="blue" @click="reloadOrigin">
                <v-icon dark> mdi-reload </v-icon>
            </v-btn>

            <CategoryBtn @initTags="initTags" @deleteTag="deleteTag" @selectTag="selectTag" />

            <CalendarBtn @selectDate="selectDate" />

            <WriteBtn @noteAdded="newNote" :date="date" :tags="tags" />
        </div>

        <v-btn class="menuBtn mx-2" fab dark color="blue" @click="btnsOn">
            <v-icon v-if="btnsToggle" class="folderOpenIcon" dark>mdi-folder-open</v-icon>
            <v-icon v-else class="folderIcon" dark>mdi-folder</v-icon>
        </v-btn>

        <TopBtn />

        <div class="noteContainer">
            <div class="importantNotesContainer">
                <v-row>
                    <p>Important Notes :</p>
                </v-row>
                <v-row v-masonry item-selector=".imNoteList">
                    <v-col class="imNoteList" v-for="(imNote, index) in importantNotes" :key="`imNote-${index}`" v-masonry-tile cols="12" lg="2" md="3" sm="6">
                        <Card :note="imNote" :date="date" :tags="tags" @modifyNote="modifyNote" @deleteNote="deleteNote" />
                    </v-col>
                </v-row>
            </div>
            <hr />
            <div v-if="!isTagMode" class="originNotesContainer">
                <v-row>
                    <p>Normal Notes :</p>
                </v-row>
                <v-row v-masonry item-selector=".noteList">
                    <v-col class="noteList" v-for="(note, index) in todayNotes" :key="`note-${index}`" v-masonry-tile cols="12" lg="2" md="3" sm="6">
                        <Card :note="note" :date="date" :tags="tags" @modifyNote="modifyNote" @deleteNote="deleteNote" />
                    </v-col>
                </v-row>
            </div>

            <div v-else class="tagNotesContainer">
                <v-row>
                    <p>Tag : {{ tag }}</p>
                </v-row>
                <v-row v-masonry item-selector=".tagNoteList">
                    <v-col class="tagNoteList" v-for="(tagNote, index) in tagNotes" :key="`tagNote-${index}`" v-masonry-tile cols="12" lg="2" md="3" sm="6">
                        <Card :note="tagNote" :date="date" :tags="tags" @modifyNote="modifyNote" @deleteNote="deleteNote" />
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-main>
</v-app>
</template>

<script>
import Header from "./components/Header";
import WriteBtn from "./components/WriteBtn";
import CalendarBtn from "./components/CalendarBtn";
import Card from "./components/Card";
import TopBtn from "./components/TopBtn";
import CategoryBtn from "./components/CategoryBtn";

export default {
    components: {
        Header,
        WriteBtn,
        CalendarBtn,
        Card,
        TopBtn,
        CategoryBtn,
    },

    data() {
        return {
            notes: [],
            todayNotes: [],
            importantNotes: [],
            mouseHover: false,
            date: "",
            tags: [],
            isTagMode: false,
            tagNotes: [],
            tag: "",

            btnsToggle: false,
            isMobile: false,
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

        if (localStorage.getItem("tags"))
            this.tags = JSON.parse(localStorage.getItem("tags"));
    },

    watch: {
        notes: {
            handler() {
                var newNotes = this.notes;
                localStorage.setItem("notes", JSON.stringify(newNotes));
                this.todayNotes = this.notes.filter((note) => note.date === this.date);
                this.importantNotes = this.notes.filter(
                    (note) => note.important === true
                );
            },
        },

        date: {
            handler() {
                this.todayNotes = this.notes.filter((note) => note.date === this.date);
            },
            deep: true,
        },

        tags: {
            handler() {
                var newTags = this.tags;
                localStorage.setItem("tags", JSON.stringify(newTags));
            },
        },
    },

    methods: {
        newNote(title, text, theme, time, date, guid, isImportant, tags) {
            this.notes.push({
                title: title,
                text: text,
                theme: theme,
                time: time,
                date: date,
                guid: guid,
                important: isImportant,
                tags: tags,
            });
        },

        modifyNote(
            title,
            text,
            theme,
            time,
            date,
            originDate,
            guid,
            important,
            tags
        ) {
            const index = this.notes.findIndex((note) => note.guid === guid);

            let tempObj = {};
            tempObj.title = title;
            tempObj.text = text;
            tempObj.theme = theme;
            tempObj.time = `edited ${date} ${time}`;
            tempObj.guid = guid;
            tempObj.date = originDate;
            tempObj.important = important;
            tempObj.tags = tags;

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
                this.todayNotes = notes.filter((note) => note.date === this.date);
            else {
                let todayNotes = notes.filter((note) => note.date === this.date);

                this.todayNotes = todayNotes.filter(
                    (note) => note.title.includes(memo) || note.text.includes(memo)
                );
            }
        },

        initTags(tags) {
            this.tags = tags;
        },

        deleteTag(index) {
            this.tags.splice(index, 1);
        },

        selectTag(tag) {
            this.tag = tag;
            this.isTagMode = true;
            this.tagNotes = this.todayNotes.filter((note) => note.tags.includes(tag));
        },

        reloadOrigin() {
            this.isTagMode = false;
        },

        btnsOn() {
            this.btnsToggle = !this.btnsToggle
        }
    },
};
</script>

<style scoped>
.reloadBtn {
    position: fixed;
    right: 5%;
    bottom: 55%;
    z-index: 10;
}

.menuBtn {
    position: fixed;
    right: 5%;
    bottom: 15%;
    z-index: 10;
}

.noteContainer {
    margin-top: 140px;
    margin-left: 25px;
    margin-right: 25px;

    font-family: nanum;
    /* font */
}

hr {
    border: dashed 2px lightgray;
}

p {
    font-family: "Sansita Swashed", cursive;
    font-size: 20px;
    color: #2196f3;
}

/* ---- CARD ---- */
@font-face {
    /* font */
    font-family: nanum;
    src: url("./assets/NanumBarunpenB.ttf");
}

/* -------------- */
</style>
