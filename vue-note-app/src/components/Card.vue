<template>
<div>
    <v-dialog v-model="dialog" width="1000">

        <template v-slot:activator="{on, attrs}">
            <v-card @mouseenter="mouseEnter" @mouseleave="mouseLeave" class="note" :style="{ 'background-color': note.theme }">

                <div v-bind="attrs" v-on="on">
                    <v-card-title>{{ note.title }}</v-card-title>
                    <v-card-text>{{ note.text }}</v-card-text>
                </div>

                <div class="footerContainer">
                    <div class="time">{{note.time}}</div>
                    <v-spacer></v-spacer>

                    <div class="iconContainer">
                        <ModifyBtn :index="index" @noteModified="modifyNote" />

                        <v-icon class="deleteIcon" @click.prevent="deleteNote(index)">mdi-delete</v-icon>
                    </div>
                </div>
            </v-card>
        </template>
        <Detail :note="note" />
    </v-dialog>
</div>
</template>

<script>
import ModifyBtn from "./ModifyBtn"
import Detail from "./Detail"
export default {
    props: {
        note: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    components: {
        ModifyBtn,
        Detail
    },

    data() {
        return {
            notes: [],
            dialog: false
        }
    },

    methods: {
        mouseEnter(e) {
            e.target.lastChild.lastChild.style.display = "flex";
        },
        mouseLeave(e) {
            e.target.lastChild.lastChild.style.display = "none";
        },
        modifyNote(title, text, theme, index, time) {
            this.notes = JSON.parse(localStorage.getItem("notes"));
            this.notes[index].title = title;
            this.notes[index].text = text;
            this.notes[index].theme = theme;
            this.notes[index].time = time;

            this.$emit("modifyNote", this.notes);
        },

        deleteNote(index) {
            this.notes = JSON.parse(localStorage.getItem("notes"));
            this.notes.splice(index, 1);

            this.$emit("deleteNote", this.notes);
        },
    }
}
</script>

<style scoped>
.footerContainer {
    display: flex;
}

.iconContainer {
    display: none;
}

.deleteIcon:hover {
    cursor: pointer;
}

.time {
    place-self: center;
    margin-left: 3%;
}
</style>
