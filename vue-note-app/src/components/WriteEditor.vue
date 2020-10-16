<template>
<div>
    <v-card class="dialogBox" v-click-outside="onClickOutside">
        <v-card-title class="headline lighten-2">
            <textarea v-model="note.title" cols="65" placeholder="Title"></textarea>
            <v-spacer></v-spacer>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
            <textarea v-model="note.text" placeholder="Take a note..." cols="65" rows="17"></textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <Color :theme="note.theme" @selectedColor="initColor" />
            <v-icon class="starIcon" :class="{important: isImportant}" @click="addImportant">mdi-star</v-icon>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="createNew"> register </v-btn>
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

        date: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isImportant: false,
        }
    },

    methods: {
        initColor(picker) {
            this.note.theme = picker;
        },
        createNew() {
            if (this.note.title === "" || this.note.text === "") {
                alert("제목이나 내용을 입력해주세요");
                return;
            }

            const dateObj = new Date();

            let hour = dateObj.getHours();
            let minutes = dateObj.getMinutes();
            let seconds = dateObj.getSeconds();

            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;

            const date = this.date;

            const time = `${hour}:${minutes}:${seconds}`;

            this.$emit(
                "noteAdded",
                this.note.title,
                this.note.text,
                this.note.theme,
                time,
                date,
                this.isImportant
            );

            this.isImportant = false;
        },

        addImportant() {
            this.isImportant = !this.isImportant;
        },

        onClickOutside() {
            this.isImportant = false;
        }
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

.important {
    color: yellow
}
</style>
