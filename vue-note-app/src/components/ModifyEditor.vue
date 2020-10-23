<template>
<div>
    <v-card class="dialogBox">
        <v-card-title class="headline lighten-2" :style="{ backgroundColor: note.theme }">
            <textarea v-model="note.title" placeholder="Title" style="width:100%"></textarea>
            <v-spacer></v-spacer>
            <div class="time">{{ note.time }}</div>
        </v-card-title>

        <v-card-text>
            <textarea v-model="note.text" placeholder="Take a note..." rows="17" style="width:100%"></textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <Color :theme="note.theme" @selectedColor="initColor" />
            <v-icon class="starIcon" :class="{ important: note.important }" @click="addImportant">mdi-star</v-icon>
            <v-select class="ml-2 mr-2" v-model="note.tags" :menu-props="{ top: true, offsetY: true }" :items="tags" attach chips label="Tags" multiple></v-select>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="modifyNote"> modify </v-btn>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import Color from "./Color";
export default {
    props: {
        note: {
            type: Object,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
    },

    methods: {
        initColor(picker) {
            this.note.theme = picker;
        },

        modifyNote() {
            if (this.note.title === "" || this.note.text === "") {
                alert("제목이나 내용을 입력해주세요");
                return;
            }

            const originDate = this.note.date;

            const dateObj = new Date();

            const year = dateObj.getFullYear();
            const month = dateObj.getMonth() + 1;
            const day = dateObj.getDate();

            let hour = dateObj.getHours();
            let minutes = dateObj.getMinutes();
            let seconds = dateObj.getSeconds();

            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;

            const date = `${year}-${month}-${day}`;

            const time = `${hour}:${minutes}:${seconds}`;

            this.$emit(
                "noteModified",
                this.note.title,
                this.note.text,
                this.note.theme,
                time,
                date,
                originDate,
                this.note.important,
                this.note.tags
            );
        },
        addImportant() {
            this.note.important = !this.note.important;
        },
    },

    components: {
        Color,
    },
};
</script>

<style scoped>
textarea {
    padding: 10px;
    resize: none;
    border: none;
    font-family: nanum;
    /* font */
}

textarea:hover {
    outline: 0;
}

textarea:focus {
    outline: 0;
}

.dialogBox {
    overflow: hidden;
}

.time {
    color: rgb(102, 102, 102);
    font-size: 15px;
    margin-bottom: -10px;
}

.important {
    color: yellow;
}
</style>
